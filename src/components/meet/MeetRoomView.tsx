// Arohi MEET™ Real-Time Multi-Party WebRTC Video Room
// Production Mesh Conferencing: Dynamic Participant Streams, Real-Time Audio/Video, Live Subtitles, Synchronized Room Chat, and Gemini AI Minutes

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Users, 
  MessageSquare, 
  PhoneOff, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Send, 
  LayoutGrid, 
  SplitSquareVertical, 
  Download, 
  Share2, 
  Copy,
  CheckCheck,
  Globe, 
  Clock, 
  Flame, 
  ArrowLeft,
  X,
  Volume2,
  Hand,
  Maximize2
} from 'lucide-react';
import ArohiMeetLogo from './ArohiMeetLogo';
import ArohiMeetAvatar from './ArohiMeetAvatar';
import { 
  MeetingSession, 
  MeetingParticipant, 
  TranscriptEntry, 
  DecisionItem, 
  ActionItem,
  ChatMessage,
  DEFAULT_RTC_CONFIG,
  getInitials,
  getAvatarColor
} from './meetData';

interface MeetRoomViewProps {
  meeting: MeetingSession;
  onEndMeeting: (updatedMeeting: MeetingSession) => void;
  onOpenAskArohi: (initialPrompt?: string) => void;
  onOpenTranscriptView: () => void;
}

interface RemotePeer {
  peerId: string;
  name: string;
  role: string;
  avatarColor: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isHandRaised: boolean;
  isScreenSharing: boolean;
  stream?: MediaStream;
}

export const MeetRoomView: React.FC<MeetRoomViewProps> = ({
  meeting,
  onEndMeeting,
  onOpenAskArohi,
  onOpenTranscriptView
}) => {
  // View mode
  const [viewLayout, setViewLayout] = useState<'grid' | 'split'>('grid');

  // User identity
  const [myPeerId] = useState(() => `peer-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`);
  const [myName] = useState(() => localStorage.getItem('arohi_meet_user_name') || meeting.organizer || 'Participant');
  const [myRole] = useState(() => meeting.participants?.[0]?.role || 'Host');
  const [myAvatarColor] = useState(() => getAvatarColor(myName));

  // Hardware states
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isRecording, setIsRecording] = useState(true);

  // Call duration
  const [durationSeconds, setDurationSeconds] = useState(meeting.durationSeconds || 0);

  // Real-time collaborative meeting state
  const [remotePeers, setRemotePeers] = useState<Map<string, RemotePeer>>(new Map());
  const [transcript, setTranscript] = useState<TranscriptEntry[]>(meeting.transcript || []);
  const [decisions, setDecisions] = useState<DecisionItem[]>(meeting.decisions || []);
  const [actionItems, setActionItems] = useState<ActionItem[]>(meeting.actionItems || []);
  const [liveCaptionsText, setLiveCaptionsText] = useState<{ speaker: string; text: string } | null>(null);

  // In-call chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(meeting.chatMessages || []);
  const [newChatText, setNewChatText] = useState('');

  // Participants drawer
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  // Ask Arohi inline panel
  const [isArohiPanelOpen, setIsArohiPanelOpen] = useState(false);
  const [arohiQuery, setArohiQuery] = useState('');
  const [arohiAnswer, setArohiAnswer] = useState<string | null>(null);
  const [isArohiThinking, setIsArohiThinking] = useState(false);

  // Split view tab
  const [splitTab, setSplitTab] = useState<'transcript' | 'decisions' | 'actions' | 'agenda'>('transcript');
  const [isSummarizingLive, setIsSummarizingLive] = useState(false);
  const [isGeneratingMOM, setIsGeneratingMOM] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  // Media and WebRTC Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Format seconds to HH:MM:SS
  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs > 0 ? String(hrs).padStart(2, '0') + ':' : ''}${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => setDurationSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to send messages safely over WebSocket
  const sendWs = useCallback((payload: Record<string, any>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  // Initialize WebRTC Peer Connection for a specific remote peer
  const createPeerConnection = useCallback((remotePeerId: string, isInitiator: boolean) => {
    if (peerConnectionsRef.current.has(remotePeerId)) {
      return peerConnectionsRef.current.get(remotePeerId)!;
    }

    const pc = new RTCPeerConnection(DEFAULT_RTC_CONFIG);
    peerConnectionsRef.current.set(remotePeerId, pc);

    // Add local stream tracks to this peer connection
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    // On remote track arrival
    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteStream) {
        setRemotePeers((prev) => {
          const updated = new Map(prev);
          const current = updated.get(remotePeerId);
          if (current) {
            updated.set(remotePeerId, { ...current, stream: remoteStream });
          }
          return updated;
        });

        // Attach to remote video element if rendered
        const videoEl = remoteVideoRefs.current.get(remotePeerId);
        if (videoEl && videoEl.srcObject !== remoteStream) {
          videoEl.srcObject = remoteStream;
          videoEl.play().catch(() => {});
        }
      }
    };

    // On ICE candidate discovery
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendWs({
          type: 'signal',
          toPeerId: remotePeerId,
          fromPeerId: myPeerId,
          signalType: 'ice-candidate',
          data: event.candidate
        });
      }
    };

    // If initiator, generate SDP Offer
    if (isInitiator) {
      pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          sendWs({
            type: 'signal',
            toPeerId: remotePeerId,
            fromPeerId: myPeerId,
            signalType: 'offer',
            data: pc.localDescription
          });
        })
        .catch((err) => console.warn(`[WebRTC] Offer error to ${remotePeerId}:`, err));
    }

    return pc;
  }, [myPeerId, sendWs]);

  // Establish local camera and microphone stream
  useEffect(() => {
    let isCancelled = false;

    async function initLocalMedia() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true
        });

        if (isCancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play().catch(() => {});
        }

        // Connect to WebSocket signaling server
        connectSignalingServer();
      } catch (err: any) {
        console.warn('Camera/Mic permission notice, joining as audio/text participant:', err);
        // Connect anyway even without camera
        connectSignalingServer();
      }
    }

    initLocalMedia();

    return () => {
      isCancelled = true;
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      // Close all peer connections
      peerConnectionsRef.current.forEach((pc) => pc.close());
      peerConnectionsRef.current.clear();
      // Close WebSocket
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Connect to the WebSocket signaling server
  const connectSignalingServer = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/meet-ws?room=${meeting.code}&peerId=${myPeerId}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(`[Meet WS] Connected to room ${meeting.code}`);
      // Join Room Announcement
      sendWs({
        type: 'join-room',
        roomId: meeting.code,
        peerId: myPeerId,
        roomTitle: meeting.title,
        user: {
          id: myPeerId,
          name: myName,
          role: myRole,
          avatarColor: myAvatarColor,
          isHost: meeting.organizer === myName,
          isMuted: isMicMuted,
          isVideoOff: isVideoOff,
          isHandRaised,
          isScreenSharing
        }
      });
    };

    ws.onmessage = async (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { type } = msg;

        switch (type) {
          // Room joined confirmation: contains existing peers
          case 'room-joined': {
            const peersMap = new Map<string, RemotePeer>();
            for (const p of msg.existingParticipants || []) {
              peersMap.set(p.peerId, {
                peerId: p.peerId,
                name: p.user?.name || 'Participant',
                role: p.user?.role || 'Guest',
                avatarColor: p.user?.avatarColor || '#3B82F6',
                isHost: !!p.user?.isHost,
                isMuted: !!p.user?.isMuted,
                isVideoOff: !!p.user?.isVideoOff,
                isHandRaised: !!p.user?.isHandRaised,
                isScreenSharing: !!p.user?.isScreenSharing
              });
              // Initiate WebRTC connection to each existing peer
              createPeerConnection(p.peerId, true);
            }
            setRemotePeers(peersMap);
            break;
          }

          // New peer joined after us
          case 'peer-joined': {
            const newPeer = msg.user;
            setRemotePeers((prev) => {
              const updated = new Map(prev);
              updated.set(msg.peerId, {
                peerId: msg.peerId,
                name: newPeer?.name || 'Participant',
                role: newPeer?.role || 'Guest',
                avatarColor: newPeer?.avatarColor || '#3B82F6',
                isHost: !!newPeer?.isHost,
                isMuted: !!newPeer?.isMuted,
                isVideoOff: !!newPeer?.isVideoOff,
                isHandRaised: !!newPeer?.isHandRaised,
                isScreenSharing: !!newPeer?.isScreenSharing
              });
              return updated;
            });
            break;
          }

          // WebRTC Signaling Messages (Offer / Answer / ICE Candidate)
          case 'signal': {
            const { fromPeerId, signalType, data } = msg;
            if (!fromPeerId) return;

            let pc = peerConnectionsRef.current.get(fromPeerId);
            if (!pc) {
              pc = createPeerConnection(fromPeerId, false);
            }

            if (signalType === 'offer') {
              await pc.setRemoteDescription(new RTCSessionDescription(data));
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);
              sendWs({
                type: 'signal',
                toPeerId: fromPeerId,
                fromPeerId: myPeerId,
                signalType: 'answer',
                data: pc.localDescription
              });
            } else if (signalType === 'answer') {
              await pc.setRemoteDescription(new RTCSessionDescription(data));
            } else if (signalType === 'ice-candidate') {
              await pc.addIceCandidate(new RTCIceCandidate(data)).catch((e) => console.warn('ICE Candidate error:', e));
            }
            break;
          }

          // Peer State Update
          case 'peer-updated': {
            setRemotePeers((prev) => {
              const updated = new Map(prev);
              const existing = updated.get(msg.peerId);
              if (existing) {
                updated.set(msg.peerId, {
                  ...existing,
                  ...msg.updates
                });
              }
              return updated;
            });
            break;
          }

          // Peer Left
          case 'peer-left': {
            const { peerId } = msg;
            const pc = peerConnectionsRef.current.get(peerId);
            if (pc) {
              pc.close();
              peerConnectionsRef.current.delete(peerId);
            }
            setRemotePeers((prev) => {
              const updated = new Map(prev);
              updated.delete(peerId);
              return updated;
            });
            break;
          }

          // Real-Time In-Call Chat
          case 'chat-message': {
            setChatMessages((prev) => [...prev, msg.message]);
            break;
          }

          // Real-Time Transcript Chunk
          case 'transcript-chunk': {
            const chunk = msg.chunk;
            setTranscript((prev) => [...prev, chunk]);
            setLiveCaptionsText({
              speaker: chunk.speakerName,
              text: chunk.text
            });
            // Hide live caption bubble after 5 seconds
            setTimeout(() => {
              setLiveCaptionsText((curr) => (curr?.text === chunk.text ? null : curr));
            }, 5000);
            break;
          }

          default:
            break;
        }
      } catch (err) {
        console.warn('[Meet WS] Message parse error:', err);
      }
    };
  }, [meeting.code, meeting.title, meeting.organizer, myPeerId, myName, myRole, myAvatarColor, isMicMuted, isVideoOff, isHandRaised, isScreenSharing, sendWs, createPeerConnection]);

  // Live Speech Recognition (Captures Spoken Words & Broadcasts to Peers)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    let recognition: any;
    try {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = meeting.settings?.language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const lastIdx = event.results.length - 1;
        const result = event.results[lastIdx];
        const spoken = result[0]?.transcript?.trim();
        const isFinal = result.isFinal;

        if (spoken) {
          setLiveCaptionsText({ speaker: 'You', text: spoken });

          if (isFinal) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const chunk: TranscriptEntry = {
              id: `tr-${Date.now()}`,
              speakerId: myPeerId,
              speakerName: myName,
              speakerRole: myRole,
              avatarColor: myAvatarColor,
              timestamp: timeStr,
              timeSeconds: durationSeconds,
              text: spoken,
              isFinal: true
            };

            setTranscript((prev) => [...prev, chunk]);

            // Broadcast to other peers in room
            sendWs({
              type: 'transcript-chunk',
              chunk
            });
          }
        }
      };

      if (!isMicMuted) {
        recognition.start();
      }
    } catch (e) {
      // Browser speech recognition fallback
    }

    return () => {
      try {
        if (recognition) recognition.stop();
      } catch {}
    };
  }, [isMicMuted, myName, myRole, myAvatarColor, myPeerId, durationSeconds, sendWs, meeting.settings?.language]);

  // Mute / Unmute Toggle
  const handleToggleMic = () => {
    const next = !isMicMuted;
    setIsMicMuted(next);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => (track.enabled = !next));
    }
    sendWs({
      type: 'peer-update',
      updates: { isMuted: next }
    });
  };

  // Video On / Off Toggle
  const handleToggleVideo = () => {
    const next = !isVideoOff;
    setIsVideoOff(next);
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => (track.enabled = !next));
    }
    sendWs({
      type: 'peer-update',
      updates: { isVideoOff: next }
    });
  };

  // Hand Raise Toggle
  const handleToggleHandRaise = () => {
    const next = !isHandRaised;
    setIsHandRaised(next);
    sendWs({
      type: 'peer-update',
      updates: { isHandRaised: next }
    });
  };

  // Screen Share Toggle
  const handleToggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) return;
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        screenStreamRef.current = stream;
        setIsScreenSharing(true);

        const screenTrack = stream.getVideoTracks()[0];

        // Replace video track on all peer connections
        peerConnectionsRef.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track && s.track.kind === 'video');
          if (sender) {
            sender.replaceTrack(screenTrack);
          }
        });

        // Also update local preview to display screen
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        sendWs({
          type: 'peer-update',
          updates: { isScreenSharing: true }
        });

        screenTrack.onended = () => {
          handleStopScreenShare();
        };
      } catch {
        setIsScreenSharing(false);
      }
    } else {
      handleStopScreenShare();
    }
  };

  const handleStopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    setIsScreenSharing(false);

    // Restore local camera track
    if (localStreamRef.current) {
      const cameraTrack = localStreamRef.current.getVideoTracks()[0];
      if (cameraTrack) {
        peerConnectionsRef.current.forEach((pc) => {
          const sender = pc.getSenders().find((s) => s.track && s.track.kind === 'video');
          if (sender) {
            sender.replaceTrack(cameraTrack);
          }
        });
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
    }

    sendWs({
      type: 'peer-update',
      updates: { isScreenSharing: false }
    });
  };

  // Send Chat Message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const chatMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      senderId: myPeerId,
      senderName: myName,
      role: myRole,
      text: newChatText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, chatMsg]);
    sendWs({
      type: 'chat-message',
      message: chatMsg
    });
    setNewChatText('');
  };

  // Real-Time Live AI Summarization
  const handleLiveSummarize = async () => {
    setIsSummarizingLive(true);
    try {
      const res = await fetch('/api/meet/summarize-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingTitle: meeting.title,
          agenda: meeting.agenda,
          transcript
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.decisions) && data.decisions.length > 0) {
          const newDecisions: DecisionItem[] = data.decisions.map((title: string, i: number) => ({
            id: `dec-${Date.now()}-${i}`,
            number: i + 1,
            title,
            status: 'Approved',
            category: 'Strategic'
          }));
          setDecisions(newDecisions);
        }
        if (Array.isArray(data.actionItems) && data.actionItems.length > 0) {
          const newActions: ActionItem[] = data.actionItems.map((a: any, i: number) => ({
            id: `act-${Date.now()}-${i}`,
            task: a.task || 'Review discussion notes',
            assignee: a.assignee || myName,
            dueDate: 'Next Meeting',
            status: 'Pending',
            priority: a.priority || 'High'
          }));
          setActionItems(newActions);
        }
      }
    } catch (err) {
      console.warn('AI summarize notice:', err);
    } finally {
      setIsSummarizingLive(false);
    }
  };

  // Generate Formal MOM Document
  const handleGenerateMOM = async () => {
    setIsGeneratingMOM(true);
    try {
      const attendees = [myName, ...Array.from(remotePeers.values()).map((p) => p.name)];
      const res = await fetch('/api/meet/generate-mom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingTitle: meeting.title,
          roomId: meeting.code,
          attendees,
          agenda: meeting.agenda,
          transcript
        })
      });

      if (res.ok) {
        const data = await res.json();
        const markdown = data.markdownMOM || `# Minutes of Meeting: ${meeting.title}\n\nGenerated by Arohi Meet.`;
        
        // Trigger download
        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Arohi_MOM_${meeting.code}_${Date.now()}.md`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.warn('MOM generation notice:', err);
    } finally {
      setIsGeneratingMOM(false);
    }
  };

  // Ask Arohi In-Call Question
  const handleAskArohiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arohiQuery.trim()) return;

    setIsArohiThinking(true);
    setArohiAnswer(null);
    try {
      const res = await fetch('/api/meet/ask-arohi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: arohiQuery.trim(),
          meetingTitle: meeting.title,
          transcript
        })
      });

      if (res.ok) {
        const data = await res.json();
        setArohiAnswer(data.answer || 'Arohi is tracking all spoken discussion.');
      }
    } catch (err) {
      setArohiAnswer('I am actively transcribing the session and ready to answer your questions.');
    } finally {
      setIsArohiThinking(false);
    }
  };

  // Copy Room Link
  const handleCopyLink = () => {
    const invite = `Join my Arohi Meet session!\nMeeting Code: ${meeting.code}\nLink: ${window.location.origin}/?tab=meet&room=${meeting.code}`;
    navigator.clipboard.writeText(invite);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  // Leave / End Meeting
  const handleLeaveOrEnd = () => {
    sendWs({ type: 'leave-room' });
    const allParticipants: MeetingParticipant[] = [
      {
        id: myPeerId,
        name: myName,
        role: myRole,
        avatarColor: myAvatarColor,
        isHost: true,
        initials: getInitials(myName)
      },
      ...Array.from(remotePeers.values()).map((p) => ({
        id: p.peerId,
        name: p.name,
        role: p.role,
        avatarColor: p.avatarColor,
        initials: getInitials(p.name)
      }))
    ];

    const updatedSession: MeetingSession = {
      ...meeting,
      durationSeconds,
      durationFormatted: formatTime(durationSeconds),
      participantsCount: allParticipants.length,
      participants: allParticipants,
      transcript,
      decisions,
      actionItems,
      chatMessages,
      status: 'completed'
    };

    onEndMeeting(updatedSession);
  };

  const remotePeerList = Array.from(remotePeers.values());
  const totalInRoom = 1 + remotePeerList.length;

  return (
    <div className="relative min-h-[95vh] w-full flex flex-col justify-between bg-[#070B14] text-white select-none overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ==================================================== */}
      {/* HEADER BAR                                           */}
      {/* ==================================================== */}
      <div className="w-full px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800/80 bg-[#070B14]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <ArohiMeetLogo size="sm" showTagline={false} />
          <div className="hidden sm:block h-4 w-px bg-slate-800" />
          
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-[200px] sm:max-w-md">
              {meeting.title}
            </h2>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{totalInRoom} {totalInRoom === 1 ? 'Person' : 'People'}</span>
              <span className="text-slate-500">•</span>
              <span className="font-mono">{formatTime(durationSeconds)}</span>
            </div>

            <button
              onClick={handleCopyLink}
              className="hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-300 hover:bg-cyan-500/20 transition"
              title="Copy Room Link"
            >
              {copiedInvite ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{meeting.code}</span>
            </button>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Ask Arohi Button */}
          <button
            onClick={() => setIsArohiPanelOpen(!isArohiPanelOpen)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition ${
              isArohiPanelOpen
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Arohi</span>
          </button>

          {/* Layout Switcher */}
          <button
            onClick={() => setViewLayout(viewLayout === 'grid' ? 'split' : 'grid')}
            title="Toggle Split / Grid View"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
          >
            {viewLayout === 'grid' ? <SplitSquareVertical className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </button>

          {/* Leave Button */}
          <button
            onClick={handleLeaveOrEnd}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 text-white font-semibold text-xs shadow-md active:scale-95 transition"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>Leave</span>
          </button>
        </div>
      </div>

      {/* Feature Pills Bar */}
      <div className="w-full px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/40 bg-[#090d1c]/60">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition flex-shrink-0 ${
            isRecording
              ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
              : 'bg-slate-900 border border-slate-800 text-slate-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AI Listening & Transcription ON</span>
        </button>

        <button
          onClick={handleLiveSummarize}
          disabled={isSummarizingLive}
          className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 flex items-center gap-1.5 transition flex-shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isSummarizingLive ? 'Analyzing discussion...' : 'AI Live Summarize'}</span>
        </button>

        <button
          onClick={handleGenerateMOM}
          disabled={isGeneratingMOM}
          className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 flex items-center gap-1.5 transition flex-shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isGeneratingMOM ? 'Drafting MOM...' : 'Download MOM (.md)'}</span>
        </button>

        <button
          onClick={onOpenTranscriptView}
          className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition flex-shrink-0"
        >
          <span className="font-bold text-[10px]">CC</span>
          <span>Full Transcript ({transcript.length})</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* MAIN VIEWPORT: GRID OR SPLIT                          */}
      {/* ==================================================== */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 flex flex-col justify-between relative">
        {viewLayout === 'grid' ? (
          /* ================================================ */
          /* REAL-TIME DYNAMIC VIDEO GRID                     */
          /* ================================================ */
          <div className="flex-1 flex flex-col justify-between">
            <div className={`grid gap-3 mb-3 ${
              totalInRoom === 1
                ? 'grid-cols-1 max-w-3xl mx-auto w-full'
                : totalInRoom === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : totalInRoom <= 4
                    ? 'grid-cols-2'
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
              {/* 1. Self Local Participant Tile */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
                {!isVideoOff ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0c1224]">
                    <div
                      style={{ backgroundColor: myAvatarColor }}
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-1 shadow-lg"
                    >
                      {getInitials(myName)}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">Camera Paused</span>
                  </div>
                )}

                {/* Hand Raise Badge */}
                {isHandRaised && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-lg animate-bounce">
                    <Hand className="w-3.5 h-3.5" />
                    <span>Hand Raised</span>
                  </div>
                )}

                {/* Screen Sharing Badge */}
                {isScreenSharing && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center gap-1 shadow-md">
                    <Monitor className="w-3 h-3" />
                    <span>Presenting Screen</span>
                  </div>
                )}

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                    <span className="font-semibold text-white truncate max-w-[120px]">{myName} (You)</span>
                    <span className="text-[10px] text-cyan-400">({myRole})</span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md border ${
                    isMicMuted ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  }`}>
                    {isMicMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* 2. Remote Connected Peers Tiles */}
              {remotePeerList.map((peer) => {
                return (
                  <div
                    key={peer.peerId}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group"
                  >
                    {!peer.isVideoOff && peer.stream ? (
                      <video
                        ref={(el) => {
                          if (el) {
                            remoteVideoRefs.current.set(peer.peerId, el);
                            if (peer.stream && el.srcObject !== peer.stream) {
                              el.srcObject = peer.stream;
                              el.play().catch(() => {});
                            }
                          }
                        }}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-[#0c1224]">
                        <div
                          style={{ backgroundColor: peer.avatarColor || '#3B82F6' }}
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-1 shadow-lg"
                        >
                          {getInitials(peer.name)}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">Camera Off</span>
                      </div>
                    )}

                    {/* Hand Raise Badge */}
                    {peer.isHandRaised && (
                      <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-lg animate-bounce">
                        <Hand className="w-3.5 h-3.5" />
                        <span>Hand Raised</span>
                      </div>
                    )}

                    {/* Bottom Overlay */}
                    <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                        <span className="font-semibold text-white truncate max-w-[120px]">{peer.name}</span>
                        <span className="text-[10px] text-slate-400">({peer.role})</span>
                      </div>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md border ${
                        peer.isMuted ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      }`}>
                        {peer.isMuted ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 3. If User is Alone: Prominent Invite Card */}
              {totalInRoom === 1 && (
                <div className="p-5 rounded-2xl bg-[#0c1224]/80 border border-cyan-500/30 flex flex-col justify-center items-center text-center shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">You are in the room</h3>
                  <p className="text-xs text-slate-400 mb-4 max-w-sm">
                    Share your meeting code or direct link to allow other team members and guests to join immediately.
                  </p>

                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">{meeting.code}</span>
                    <button
                      onClick={handleCopyLink}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedInvite ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedInvite ? 'Link Copied to Clipboard!' : 'Copy Meeting Invite Link'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Live Closed Caption Bubble */}
            {liveCaptionsText && (
              <div className="w-full max-w-2xl mx-auto p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-center mb-3 shadow-2xl transition animate-fadeIn">
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block mb-0.5">
                  {liveCaptionsText.speaker}
                </span>
                <p className="text-xs sm:text-sm text-white font-medium italic">
                  "{liveCaptionsText.text}"
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ================================================ */
          /* SPLIT-SCREEN COLLABORATIVE WORKSPACE             */
          /* ================================================ */
          <div className="flex-1 flex flex-col justify-between">
            {/* Top Compact Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-3 border-b border-slate-800">
              <div className="w-32 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/40 relative flex-shrink-0">
                {!isVideoOff ? (
                  <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-cyan-400">YOU</div>
                )}
                <div className="absolute bottom-1 left-1 px-1 rounded bg-black/70 text-[9px] text-white">You</div>
              </div>

              {remotePeerList.map((peer) => (
                <div key={peer.peerId} className="w-32 aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative flex-shrink-0">
                  <div
                    style={{ backgroundColor: peer.avatarColor }}
                    className="w-full h-full flex items-center justify-center text-xs font-bold text-white"
                  >
                    {getInitials(peer.name)}
                  </div>
                  <div className="absolute bottom-1 left-1 px-1 rounded bg-black/70 text-[9px] text-white truncate max-w-[80px]">
                    {peer.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Split Switcher Tabs */}
            <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
              {(['transcript', 'decisions', 'actions', 'agenda'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSplitTab(tab)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition ${
                    splitTab === tab
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {tab === 'transcript' ? `Live Transcript (${transcript.length})` : tab}
                </button>
              ))}
            </div>

            {/* Split Content Area */}
            <div className="flex-1 bg-[#0c1224]/80 rounded-2xl border border-slate-800 p-4 overflow-y-auto max-h-[50vh]">
              {splitTab === 'transcript' && (
                <div className="space-y-3">
                  {transcript.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-8">
                      No spoken dialogue recorded yet. Unmute your microphone and speak to see live transcription.
                    </p>
                  ) : (
                    transcript.map((t) => (
                      <div key={t.id} className="text-xs border-b border-slate-800/60 pb-2">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                          <span className="font-semibold text-cyan-300">{t.speakerName}</span>
                          <span>{t.timestamp}</span>
                        </div>
                        <p className="text-slate-200">{t.text}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {splitTab === 'decisions' && (
                <div className="space-y-2">
                  {decisions.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400">
                      <p>No decisions extracted yet.</p>
                      <button
                        onClick={handleLiveSummarize}
                        className="mt-2 text-cyan-400 hover:underline"
                      >
                        Click "AI Live Summarize" to analyze dialogue.
                      </button>
                    </div>
                  ) : (
                    decisions.map((d) => (
                      <div key={d.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                        <span>{d.title}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                          {d.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {splitTab === 'actions' && (
                <div className="space-y-2">
                  {actionItems.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400">
                      <p>No action items assigned yet.</p>
                      <button
                        onClick={handleLiveSummarize}
                        className="mt-2 text-cyan-400 hover:underline"
                      >
                        Extract action items with AI
                      </button>
                    </div>
                  ) : (
                    actionItems.map((a) => (
                      <div key={a.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{a.task}</p>
                          <span className="text-[10px] text-cyan-400">Owner: {a.assignee}</span>
                        </div>
                        <span className="text-[10px] text-purple-300">{a.status}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {splitTab === 'agenda' && (
                <div className="space-y-2">
                  {meeting.agenda.map((ag, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-[10px]">
                        {i + 1}
                      </span>
                      <span>{ag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* IN-MEETING "ASK AROHI" DRAWER                        */}
        {/* ==================================================== */}
        {isArohiPanelOpen && (
          <div className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-[#0c1224] border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] mb-3 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ArohiMeetAvatar size="sm" status="ready" />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>Ask Arohi Copilot</span>
                    <span className="text-cyan-400">✦</span>
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Grounded directly in what was said in this session.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsArohiPanelOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {arohiAnswer && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs text-cyan-100 mb-2">
                <p className="font-semibold text-cyan-300 text-[10px] uppercase tracking-wider mb-0.5">Arohi:</p>
                {arohiAnswer}
              </div>
            )}

            <form onSubmit={handleAskArohiSubmit} className="flex gap-2">
              <input
                type="text"
                value={arohiQuery}
                onChange={(e) => setArohiQuery(e.target.value)}
                placeholder="e.g. What did we decide about the budget? or Summarize the last 5 minutes"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={isArohiThinking}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs transition active:scale-95 disabled:opacity-50"
              >
                {isArohiThinking ? 'Thinking...' : 'Ask'}
              </button>
            </form>
          </div>
        )}

        {/* ==================================================== */}
        {/* IN-CALL CHAT DRAWER                                  */}
        {/* ==================================================== */}
        {isChatOpen && (
          <div className="absolute right-4 bottom-20 z-40 w-80 sm:w-96 rounded-2xl bg-[#0c1224] border border-cyan-500/40 shadow-2xl flex flex-col max-h-[450px]">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>In-Call Room Chat</span>
              </span>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 max-h-[300px]">
              {chatMessages.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-6">No chat messages yet.</p>
              ) : (
                chatMessages.map((m) => (
                  <div key={m.id} className="text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-semibold text-cyan-300">{m.senderName}</span>
                      <span>{m.timestamp}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendChat} className="p-2.5 border-t border-slate-800 flex gap-1.5">
              <input
                type="text"
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="Type a message to the room..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" className="p-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-500 transition">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* ==================================================== */}
        {/* BOTTOM CALL CONTROLS DOCK                             */}
        {/* ==================================================== */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3 px-4 rounded-3xl bg-[#0c1224]/90 backdrop-blur-md border border-slate-800/90 shadow-2xl z-20">
          {/* Mute / Unmute */}
          <button
            onClick={handleToggleMic}
            className={`p-3 rounded-2xl border transition ${
              isMicMuted
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
            }`}
            title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-400" />}
          </button>

          {/* Camera On / Off */}
          <button
            onClick={handleToggleVideo}
            className={`p-3 rounded-2xl border transition ${
              isVideoOff
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
            }`}
            title={isVideoOff ? 'Start Video' : 'Stop Video'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5 text-cyan-400" />}
          </button>

          {/* Screen Sharing */}
          <button
            onClick={handleToggleScreenShare}
            className={`p-3 rounded-2xl border transition ${
              isScreenSharing
                ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
          >
            <Monitor className="w-5 h-5" />
          </button>

          {/* Hand Raise */}
          <button
            onClick={handleToggleHandRaise}
            className={`p-3 rounded-2xl border transition ${
              isHandRaised
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Raise Hand"
          >
            <Hand className="w-5 h-5" />
          </button>

          {/* Chat Drawer Toggle */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-3 rounded-2xl border transition relative ${
              isChatOpen
                ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="In-Call Chat"
          >
            <MessageSquare className="w-5 h-5" />
            {chatMessages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center">
                {chatMessages.length}
              </span>
            )}
          </button>

          {/* Red End / Leave Button */}
          <button
            onClick={handleLeaveOrEnd}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-95 transition"
            title="Leave Meeting"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetRoomView;
