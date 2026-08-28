import React, { useRef, useState } from 'react';
import { Mission87Enrollment } from '../../types/mission87';
import { 
  ShieldCheck, 
  Download, 
  Share2, 
  Sparkles, 
  QrCode, 
  CheckCircle2, 
  Award, 
  MapPin, 
  User, 
  Calendar,
  Flame,
  Check,
  Copy,
  Loader2,
  Image as ImageIcon,
  X
} from 'lucide-react';

interface Mission87IDCardProps {
  enrollment: Mission87Enrollment;
  onShare?: () => void;
  onClose?: () => void;
}

export default function Mission87IDCard({ enrollment, onShare, onClose }: Mission87IDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(enrollment.cadetId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTrackBadge = (track: string) => {
    switch (track) {
      case 'digital_business': return 'Digital Business & AI';
      case 'manufacturing': return 'Regional Manufacturing';
      case 'agritech_food': return 'Agri-Tech & Food';
      case 'skilled_green': return 'Solar & EV Mobility';
      case 'creative_commerce': return 'Creative & Exports';
      default: return 'Trade & Essential Services';
    }
  };

  // Generate High-Res 1200x720 Canvas ID Pass
  const generatePassCanvas = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 720;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context not available');
        }

        // 1. Deep Sovereign Gradient Background
        const bgGrad = ctx.createLinearGradient(0, 0, 1200, 720);
        bgGrad.addColorStop(0, '#070417');
        bgGrad.addColorStop(0.5, '#12082f');
        bgGrad.addColorStop(1, '#1b0c48');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1200, 720);

        // 2. Ambient Radial Lighting Orbs
        const radialTopRight = ctx.createRadialGradient(1050, 100, 10, 1050, 100, 450);
        radialTopRight.addColorStop(0, 'rgba(245, 158, 11, 0.18)');
        radialTopRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radialTopRight;
        ctx.fillRect(0, 0, 1200, 720);

        const radialBottomLeft = ctx.createRadialGradient(150, 600, 10, 150, 600, 400);
        radialBottomLeft.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
        radialBottomLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radialBottomLeft;
        ctx.fillRect(0, 0, 1200, 720);

        // Helper for rounded rectangles
        const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + w - r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
        };

        // 3. Card Outer Border with Gold & Purple accents
        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
        drawRoundRect(24, 24, 1152, 672, 28);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        drawRoundRect(32, 32, 1136, 656, 22);
        ctx.stroke();
        ctx.restore();

        // 4. Tricolor Accent Band on Top
        const tricolorY = 32;
        const triWidth = 1136 / 3;
        ctx.fillStyle = '#FF9933'; // Saffron
        ctx.fillRect(32, tricolorY, triWidth, 5);
        ctx.fillStyle = '#FFFFFF'; // White
        ctx.fillRect(32 + triWidth, tricolorY, triWidth, 5);
        ctx.fillStyle = '#138808'; // Green
        ctx.fillRect(32 + triWidth * 2, tricolorY, triWidth, 5);

        // 5. Header Section
        // Left Flag & Movement Title
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText('🇮🇳', 60, 95);

        ctx.fillStyle = '#fbbf24';
        ctx.font = '900 13px monospace';
        ctx.letterSpacing = '2px';
        ctx.fillText('BHARAT NATIONAL YOUTH ACTIVATION MOVEMENT', 115, 78);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 28px sans-serif';
        ctx.letterSpacing = '0px';
        ctx.fillText('MISSION 87', 115, 110);

        ctx.fillStyle = '#c084fc';
        ctx.font = '300 24px sans-serif';
        ctx.fillText('|  AROHI AI SOVEREIGN ECOSYSTEM', 300, 110);

        // Right Cadet ID Badge
        ctx.fillStyle = 'rgba(9, 6, 24, 0.9)';
        drawRoundRect(820, 60, 310, 68, 16);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('OFFICIAL CADET ID', 840, 82);

        ctx.fillStyle = '#fde047';
        ctx.font = '900 18px monospace';
        ctx.fillText(enrollment.cadetId, 840, 108);

        // Verified Stamp Badge
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        drawRoundRect(990, 72, 125, 26, 13);
        ctx.fill();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#6ee7b7';
        ctx.font = '900 10px sans-serif';
        ctx.fillText('✓ VERIFIED', 1018, 89);

        // Divider Line
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(60, 145);
        ctx.lineTo(1140, 145);
        ctx.stroke();

        // 6. Cadet Body Info (Left 65%)
        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('CADET FULL NAME', 60, 180);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 34px sans-serif';
        ctx.fillText(enrollment.name, 60, 222);

        // Location & Demographics
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '600 16px sans-serif';
        const locationStr = `📍 ${enrollment.townVillage ? enrollment.townVillage + ', ' : ''}${enrollment.district}, ${enrollment.state}`;
        ctx.fillText(locationStr, 60, 255);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 14px sans-serif';
        ctx.fillText(`Age Bracket: ${enrollment.ageGroup}  •  Commitment: ${enrollment.hoursPerDay || '4-6 hrs/day'}  •  Status: Activated`, 60, 282);

        // 2 Info Box Cards
        // Card 1: Assigned Track
        ctx.fillStyle = 'rgba(9, 6, 24, 0.8)';
        drawRoundRect(60, 310, 340, 85, 18);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('ASSIGNED ECONOMIC TRACK', 80, 335);

        ctx.fillStyle = '#fcd34d';
        ctx.font = 'bold 17px sans-serif';
        ctx.fillText(getTrackBadge(enrollment.primaryTrack), 80, 368);

        // Card 2: Enrollment Date & Milestone
        ctx.fillStyle = 'rgba(9, 6, 24, 0.8)';
        drawRoundRect(420, 310, 330, 85, 18);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('ENROLLMENT DATE & TARGET', 440, 335);

        const enrollDate = new Date(enrollment.enrolledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`${enrollDate}  (Target: ₹5K → ₹1L+)`, 440, 368);

        // Progression Badges Row
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('PROGRESSION BADGES & VERIFIED CLEARANCE', 60, 435);

        // Badge 1
        ctx.fillStyle = 'rgba(139, 92, 246, 0.25)';
        drawRoundRect(60, 450, 160, 36, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.stroke();
        ctx.fillStyle = '#e9d5ff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('✓ Enrolled & Active', 80, 473);

        // Badge 2
        ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
        drawRoundRect(235, 450, 200, 36, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.stroke();
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('★ Future Map Ready', 255, 473);

        // Badge 3
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        drawRoundRect(450, 450, 180, 36, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.stroke();
        ctx.fillStyle = '#bfdbfe';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('🔥 Mission ₹5K Active', 470, 473);

        // 7. Right QR Box & Sovereign Verification Seal (Right 35%)
        const qrBoxX = 810;
        const qrBoxY = 175;
        const qrBoxW = 320;
        const qrBoxH = 320;

        ctx.fillStyle = 'rgba(8, 5, 22, 0.85)';
        drawRoundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 22);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // White Inner QR Card
        const innerQrX = qrBoxX + 60;
        const innerQrY = qrBoxY + 30;
        const innerQrSize = 200;
        ctx.fillStyle = '#ffffff';
        drawRoundRect(innerQrX, innerQrY, innerQrSize, innerQrSize, 16);
        ctx.fill();

        // High precision QR pattern rendering
        ctx.fillStyle = '#0f172a';
        // 3 Corner Finder Patterns
        const drawFinder = (fx: number, fy: number) => {
          ctx.fillRect(fx, fy, 48, 48);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(fx + 8, fy + 8, 32, 32);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(fx + 16, fy + 16, 16, 16);
        };
        drawFinder(innerQrX + 16, innerQrY + 16);
        drawFinder(innerQrX + innerQrSize - 64, innerQrY + 16);
        drawFinder(innerQrX + 16, innerQrY + innerQrSize - 64);

        // QR Matrix bits simulation with Cadet hash
        const seed = enrollment.cadetId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        for (let row = 0; row < 12; row++) {
          for (let col = 0; col < 12; col++) {
            const px = innerQrX + 72 + col * 9;
            const py = innerQrY + 72 + row * 9;
            if ((seed * (row + 1) * (col + 2)) % 3 === 0) {
              ctx.fillRect(px, py, 7, 7);
            }
          }
        }

        // Center Arohi Emblem in QR
        ctx.fillStyle = '#7c3aed';
        drawRoundRect(innerQrX + 82, innerQrY + 82, 36, 36, 8);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.fillText('A', innerQrX + 93, innerQrY + 107);

        // Verification Labels under QR
        ctx.fillStyle = '#c084fc';
        ctx.font = '900 12px monospace';
        ctx.fillText('SCAN TO VERIFY PASS', qrBoxX + 85, qrBoxY + 265);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 11px sans-serif';
        ctx.fillText('Arohi AI Sovereign Verification Protocol', qrBoxX + 50, qrBoxY + 288);

        // 8. Footer Section
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(60, 560);
        ctx.lineTo(1140, 560);
        ctx.stroke();

        // Footer Text
        ctx.fillStyle = '#fde047';
        ctx.font = '900 15px sans-serif';
        ctx.fillText('✨ ONE AI. INFINITE OPPORTUNITIES.', 60, 595);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '600 14px sans-serif';
        ctx.fillText('📞 Helpline: +91-90904 55555   •   🌐 arohiai.com', 750, 595);

        // Slogan Watermark across bottom
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.font = 'italic 500 13px sans-serif';
        ctx.fillText('87 Million are not waiting for India. India is waiting for what 87 Million can build.', 60, 635);

        ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('NITI AAYOG NEET TO VALUE CREATOR ACTIVATION', 740, 635);

        // Export as Blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas blob generation failed'));
          }
        }, 'image/png', 1.0);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleDownloadPass = async () => {
    try {
      setIsGenerating(true);
      setDownloadSuccess(false);

      const blob = await generatePassCanvas();
      const url = URL.createObjectURL(blob);
      const fileName = `Mission87_Cadet_Pass_${enrollment.cadetId}.png`;

      // Trigger standard file download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Save url in state for image modal preview
      setPreviewImageUrl(url);
      setDownloadSuccess(true);
      setIsGenerating(false);

      setTimeout(() => {
        setDownloadSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error downloading pass:', err);
      setIsGenerating(false);
      // Fallback: window print
      window.print();
    }
  };

  const handleSharePass = async () => {
    try {
      const shareText = `I am Cadet ${enrollment.name} (Cadet ID: ${enrollment.cadetId}) in 🇮🇳 MISSION 87 on Arohi AI! 87 Million are not waiting for India. India is waiting for what 87 Million can build. Join the movement at https://arohiai.com`;

      // Check if navigator.share supports image files
      if (navigator.canShare) {
        try {
          const blob = await generatePassCanvas();
          const file = new File([blob], `Mission87_Pass_${enrollment.cadetId}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Mission 87 Official Cadet Pass',
              text: shareText,
              files: [file]
            });
            return;
          }
        } catch (shareFileErr) {
          console.warn('File share not supported, falling back to text share:', shareFileErr);
        }
      }

      if (onShare) {
        onShare();
      } else {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* The Visual Card Container */}
      <div 
        ref={cardRef}
        id="mission87-digital-pass"
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0c0822] via-[#140e36] to-[#1f0f4a] border-2 border-[#7c3aed]/50 text-white shadow-[0_15px_40px_rgba(124,58,237,0.35)] select-none text-left"
      >
        {/* Background Sovereign Watermarks & Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-emerald-500/10 via-teal-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/30 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🇮🇳</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">NATIONAL MOVEMENT PASS</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED CADET
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                MISSION 87 <span className="text-purple-400 font-light">| AROHI AI</span>
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CADET ID</span>
            <div className="flex items-center gap-1.5 bg-[#090616] px-3 py-1 rounded-xl border border-purple-500/40 font-mono text-xs sm:text-sm font-black text-amber-300">
              <span>{enrollment.cadetId}</span>
              <button 
                onClick={handleCopyId}
                className="hover:text-white transition-colors cursor-pointer" 
                title="Copy Cadet ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
              </button>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 items-center">
          {/* Col 1 & 2: Cadet Info */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest block">CADET NAME</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{enrollment.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {enrollment.townVillage ? `${enrollment.townVillage}, ` : ''}{enrollment.district}, {enrollment.state}
                </span>
                <span className="text-purple-400">•</span>
                <span>Age: {enrollment.ageGroup}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#090618]/70 border border-purple-500/20 rounded-2xl p-3">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">ASSIGNED TRACK</span>
                <p className="text-xs font-bold text-amber-300 mt-0.5 line-clamp-1">{getTrackBadge(enrollment.primaryTrack)}</p>
              </div>

              <div className="bg-[#090618]/70 border border-purple-500/20 rounded-2xl p-3">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">ENROLLMENT DATE</span>
                <p className="text-xs font-bold text-white mt-0.5">{new Date(enrollment.enrolledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>

            {/* Milestones unlocked */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">PROGRESSION BADGES</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-purple-500/20 border border-purple-400/40 text-purple-200 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Enrolled & Active
                </span>
                <span className="bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" /> Future Map Generated
                </span>
                <span className="bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" /> Mission ₹5K Active
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: QR & Seal */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#090618]/80 border border-purple-500/30 rounded-2xl text-center space-y-2">
            <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-inner flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
            <span className="text-[9px] font-mono text-purple-300 uppercase tracking-widest">
              SCAN TO VERIFY
            </span>
            <div className="text-[8px] text-slate-400 font-semibold leading-tight">
              Arohi AI Sovereign Verification
            </div>
          </div>
        </div>

        {/* Card Footer Motto */}
        <div className="border-t border-purple-500/30 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 font-semibold">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <span>✨ ONE AI. INFINITE OPPORTUNITIES.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📞 Helpline: +91-90904 55555</span>
            <span>•</span>
            <span>🌐 arohiai.com</span>
          </div>
        </div>
      </div>

      {/* Download Success Notice */}
      {downloadSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-400/50 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-200 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Pass Downloaded!</strong> Saved as PNG to your device.</span>
          </div>
          {previewImageUrl && (
            <button
              onClick={() => window.open(previewImageUrl, '_blank')}
              className="text-[11px] font-bold text-emerald-300 underline hover:text-white cursor-pointer"
            >
              View Full Image
            </button>
          )}
        </div>
      )}

      {/* Action Buttons Below Pass */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="text-xs text-slate-400 font-medium">
          Save your official digital cadet pass to your phone or share with your network.
        </p>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Close
            </button>
          )}

          <button
            onClick={handleDownloadPass}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Generating HD Pass...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-950" />
                <span>Download Pass</span>
              </>
            )}
          </button>

          <button
            onClick={handleSharePass}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share On WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Mobile Image Preview Modal Fallback */}
      {previewImageUrl && (
        <div className="p-4 bg-[#0a051d] border border-purple-500/30 rounded-2xl space-y-2 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> High-Resolution Pass Ready
            </span>
            <button
              onClick={() => setPreviewImageUrl(null)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300">
            If your mobile browser did not auto-save, tap & hold the image below to save directly to your Photo Gallery:
          </p>
          <div className="overflow-hidden rounded-xl border border-purple-500/40 shadow-xl">
            <img 
              src={previewImageUrl} 
              alt="Mission 87 Official Cadet Pass" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

