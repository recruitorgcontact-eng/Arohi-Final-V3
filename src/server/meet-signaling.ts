// Arohi MEET™ Global Real-Time Multi-Party WebRTC Signaling Server
// Handles Room Management, WebRTC Peer-to-Peer Signaling (Offer/Answer/ICE), Live In-Call Chat, Real-Time Transcription Sync, and Presence Heartbeats.

import { WebSocketServer, WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import { URL } from 'url';

export interface MeetUserPayload {
  id: string;
  name: string;
  role: string;
  avatarColor?: string;
  isHost?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isHandRaised?: boolean;
  isScreenSharing?: boolean;
}

export interface ConnectedPeer {
  ws: WebSocket;
  peerId: string;
  roomId: string;
  user: MeetUserPayload;
  joinedAt: number;
  isAlive: boolean;
}

export interface RoomState {
  roomId: string;
  title: string;
  createdAt: number;
  hostPeerId: string;
  peers: Map<string, ConnectedPeer>;
}

// Global in-memory rooms registry
const activeRooms = new Map<string, RoomState>();

export const meetWss = new WebSocketServer({ noServer: true });

function broadcastToRoom(
  roomId: string,
  message: Record<string, any>,
  excludePeerId?: string
) {
  const room = activeRooms.get(roomId);
  if (!room) return;

  const payload = JSON.stringify(message);
  for (const [peerId, peer] of room.peers.entries()) {
    if (excludePeerId && peerId === excludePeerId) continue;
    if (peer.ws.readyState === WebSocket.OPEN) {
      try {
        peer.ws.send(payload);
      } catch (err) {
        console.warn(`[Meet WS] Failed to send message to peer ${peerId}:`, err);
      }
    }
  }
}

function removePeerFromRoom(roomId: string, peerId: string) {
  const room = activeRooms.get(roomId);
  if (!room) return;

  if (room.peers.has(peerId)) {
    const peer = room.peers.get(peerId);
    room.peers.delete(peerId);

    console.log(`[Meet WS] Peer ${peerId} (${peer?.user?.name}) left room ${roomId}. Remaining: ${room.peers.size}`);

    // Notify all remaining peers
    broadcastToRoom(roomId, {
      type: 'peer-left',
      peerId,
      user: peer?.user,
      remainingCount: room.peers.size
    });

    // If room is completely empty, clean up after 5 minutes grace period
    if (room.peers.size === 0) {
      setTimeout(() => {
        const check = activeRooms.get(roomId);
        if (check && check.peers.size === 0) {
          activeRooms.delete(roomId);
          console.log(`[Meet WS] Room ${roomId} reclaimed after inactivity.`);
        }
      }, 5 * 60 * 1000);
    }
  }
}

meetWss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
  let boundPeerId: string | null = null;
  let boundRoomId: string | null = null;

  let isAlive = true;
  ws.on('pong', () => {
    isAlive = true;
  });

  // Query parameter pre-extraction if present
  try {
    const parsedUrl = new URL(request.url || '', 'http://localhost');
    const qRoom = parsedUrl.searchParams.get('room');
    const qPeer = parsedUrl.searchParams.get('peerId');
    const qName = parsedUrl.searchParams.get('name');
    const qRole = parsedUrl.searchParams.get('role');

    if (qRoom && qPeer) {
      boundRoomId = qRoom.trim().toUpperCase();
      boundPeerId = qPeer.trim();
    }
  } catch {}

  ws.on('message', (raw: string) => {
    try {
      const msg = JSON.parse(raw.toString());
      const { type } = msg;

      switch (type) {
        // 1. Peer Join Room
        case 'join-room': {
          const roomId = (msg.roomId || boundRoomId || 'DEFAULT-ROOM').trim().toUpperCase();
          const peerId = (msg.peerId || boundPeerId || `peer-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`).trim();
          const user: MeetUserPayload = {
            id: peerId,
            name: msg.user?.name || 'Participant',
            role: msg.user?.role || 'Guest',
            avatarColor: msg.user?.avatarColor || '#3B82F6',
            isHost: !!msg.user?.isHost,
            isMuted: !!msg.user?.isMuted,
            isVideoOff: !!msg.user?.isVideoOff,
            isHandRaised: !!msg.user?.isHandRaised,
            isScreenSharing: !!msg.user?.isScreenSharing
          };

          boundRoomId = roomId;
          boundPeerId = peerId;

          let room = activeRooms.get(roomId);
          if (!room) {
            room = {
              roomId,
              title: msg.roomTitle || `Arohi Room ${roomId}`,
              createdAt: Date.now(),
              hostPeerId: peerId,
              peers: new Map()
            };
            activeRooms.set(roomId, room);
            console.log(`[Meet WS] New Room created: ${roomId} by ${user.name}`);
          }

          // If peer was previously registered, update socket
          const existingPeer = room.peers.get(peerId);
          if (existingPeer && existingPeer.ws !== ws) {
            try {
              existingPeer.ws.close();
            } catch {}
          }

          const newPeer: ConnectedPeer = {
            ws,
            peerId,
            roomId,
            user,
            joinedAt: Date.now(),
            isAlive: true
          };

          room.peers.set(peerId, newPeer);

          // Prepare list of existing participants for the new joiner
          const existingParticipants = Array.from(room.peers.values())
            .filter((p) => p.peerId !== peerId)
            .map((p) => ({
              peerId: p.peerId,
              user: p.user,
              joinedAt: p.joinedAt
            }));

          // Send confirmation to the joining peer
          ws.send(
            JSON.stringify({
              type: 'room-joined',
              roomId,
              peerId,
              user,
              roomTitle: room.title,
              existingParticipants,
              totalParticipants: room.peers.size
            })
          );

          // Broadcast to all other peers in the room
          broadcastToRoom(
            roomId,
            {
              type: 'peer-joined',
              peerId,
              user,
              totalParticipants: room.peers.size
            },
            peerId
          );

          console.log(`[Meet WS] User '${user.name}' joined room '${roomId}' (${room.peers.size} in room)`);
          break;
        }

        // 2. WebRTC Peer-to-Peer Signaling (Offer / Answer / ICE Candidate)
        case 'signal': {
          const { toPeerId, fromPeerId, signalType, data } = msg;
          if (!boundRoomId || !toPeerId) return;

          const room = activeRooms.get(boundRoomId);
          if (!room) return;

          const targetPeer = room.peers.get(toPeerId);
          if (targetPeer && targetPeer.ws.readyState === WebSocket.OPEN) {
            targetPeer.ws.send(
              JSON.stringify({
                type: 'signal',
                fromPeerId: fromPeerId || boundPeerId,
                toPeerId,
                signalType,
                data
              })
            );
          }
          break;
        }

        // 3. Peer State Update (Mute, Video, Hand Raise, Screen Share)
        case 'peer-update': {
          if (!boundRoomId || !boundPeerId) return;
          const room = activeRooms.get(boundRoomId);
          if (!room) return;

          const peer = room.peers.get(boundPeerId);
          if (peer) {
            peer.user = {
              ...peer.user,
              ...msg.updates
            };

            broadcastToRoom(
              boundRoomId,
              {
                type: 'peer-updated',
                peerId: boundPeerId,
                updates: msg.updates,
                user: peer.user
              },
              boundPeerId
            );
          }
          break;
        }

        // 4. Live In-Call Chat Message
        case 'chat-message': {
          if (!boundRoomId) return;
          const chatPayload = {
            type: 'chat-message',
            message: {
              id: msg.message?.id || `chat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              senderId: boundPeerId,
              senderName: msg.message?.senderName || 'Anonymous',
              role: msg.message?.role || 'Member',
              text: msg.message?.text || '',
              timestamp: msg.message?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isAnnouncement: !!msg.message?.isAnnouncement
            }
          };

          broadcastToRoom(boundRoomId, chatPayload);
          break;
        }

        // 5. Real-Time Live Speech Transcript Broadcast
        case 'transcript-chunk': {
          if (!boundRoomId) return;
          const transcriptPayload = {
            type: 'transcript-chunk',
            chunk: {
              id: msg.chunk?.id || `tr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              speakerId: boundPeerId,
              speakerName: msg.chunk?.speakerName || 'Speaker',
              speakerRole: msg.chunk?.speakerRole || 'Member',
              text: msg.chunk?.text || '',
              timestamp: msg.chunk?.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              timeSeconds: msg.chunk?.timeSeconds || Math.floor(Date.now() / 1000),
              isFinal: msg.chunk?.isFinal !== false,
              isHighlight: !!msg.chunk?.isHighlight
            }
          };

          broadcastToRoom(boundRoomId, transcriptPayload);
          break;
        }

        // 6. Collaborative Meeting Actions (Host ended meeting, Agenda checked, etc.)
        case 'meeting-action': {
          if (!boundRoomId) return;
          broadcastToRoom(boundRoomId, {
            type: 'meeting-action',
            action: msg.action,
            data: msg.data,
            senderId: boundPeerId
          });
          break;
        }

        // 7. Ping / Heartbeat
        case 'ping': {
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;
        }

        // 8. Explicit Leave
        case 'leave-room': {
          if (boundRoomId && boundPeerId) {
            removePeerFromRoom(boundRoomId, boundPeerId);
            boundRoomId = null;
            boundPeerId = null;
          }
          break;
        }

        default:
          break;
      }
    } catch (parseErr) {
      console.warn('[Meet WS] Received invalid JSON:', parseErr);
    }
  });

  ws.on('close', () => {
    if (boundRoomId && boundPeerId) {
      removePeerFromRoom(boundRoomId, boundPeerId);
    }
  });

  ws.on('error', (err) => {
    console.warn(`[Meet WS] Socket error on peer ${boundPeerId}:`, err?.message || err);
    if (boundRoomId && boundPeerId) {
      removePeerFromRoom(boundRoomId, boundPeerId);
    }
  });
});

// Periodic Heartbeat check to prevent hanging connections
const heartbeatInterval = setInterval(() => {
  for (const [roomId, room] of activeRooms.entries()) {
    for (const [peerId, peer] of room.peers.entries()) {
      if (!peer.isAlive) {
        console.log(`[Meet WS] Terminating dead socket for peer ${peerId}`);
        peer.ws.terminate();
        room.peers.delete(peerId);
        broadcastToRoom(roomId, {
          type: 'peer-left',
          peerId,
          user: peer.user,
          remainingCount: room.peers.size
        });
        continue;
      }
      peer.isAlive = false;
      try {
        peer.ws.ping();
      } catch {
        peer.ws.terminate();
        room.peers.delete(peerId);
      }
    }
  }
}, 30000);

heartbeatInterval.unref?.();
