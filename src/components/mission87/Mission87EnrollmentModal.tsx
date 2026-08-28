import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Factory, 
  Sprout, 
  Sun, 
  Palette, 
  Wrench,
  Loader2,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Mission87Enrollment, Mission87TrackType, Mission87EducationStatus } from '../../types/mission87';
import { STATES_AND_UT_LIST } from '../../data/mission87Data';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Mission87EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (enrollment: Mission87Enrollment) => void;
  onOpenAuthModal: () => void;
}

export default function Mission87EnrollmentModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  onOpenAuthModal 
}: Mission87EnrollmentModalProps) {
  const { user, userData, updateMission87Enrollment } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState(user?.displayName || userData?.profile?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(userData?.profile?.phone || '');
  const [state, setState] = useState('Odisha');
  const [district, setDistrict] = useState('');
  const [townVillage, setTownVillage] = useState('');
  const [ageGroup, setAgeGroup] = useState('18-24');
  const [educationStatus, setEducationStatus] = useState<Mission87EducationStatus>('seeking_work');
  const [primaryTrack, setPrimaryTrack] = useState<Mission87TrackType>('digital_business');
  const [hoursPerDay, setHoursPerDay] = useState('4-6 hours/day');
  const [equipment, setEquipment] = useState<string[]>(['Smartphone (4G/5G)']);

  if (!isOpen) return null;

  const toggleEquipment = (item: string) => {
    setEquipment(prev => 
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
    );
  };

  const handleEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!district.trim()) {
      setError('Please provide your district.');
      return;
    }

    if (!user) {
      // Must authenticate first
      onOpenAuthModal();
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const cadetId = `M87-IND-2026-${randomSuffix}`;

      const newEnrollment: Mission87Enrollment = {
        cadetId,
        userId: user.uid,
        name: fullName.trim(),
        phone: phoneNumber.trim() || 'N/A',
        email: user.email || 'N/A',
        state,
        district: district.trim(),
        townVillage: townVillage.trim(),
        ageGroup,
        educationStatus,
        primaryTrack,
        hoursPerDay,
        availableEquipment: equipment,
        enrolledAt: new Date().toISOString(),
        milestones: ['enrolled'],
        verifiedProjects: [],
        totalEarningsLogged: 0
      };

      // Persist in localStorage
      localStorage.setItem(`arohi_mission87_enrollment_${user.uid}`, JSON.stringify(newEnrollment));
      localStorage.setItem('arohi_mission87_enrolled', 'true');

      // Unified resilient Firestore & server sync
      try {
        await updateMission87Enrollment(newEnrollment);
      } catch (fsErr) {
        console.warn('Firestore sync note:', fsErr);
      }

      setIsSubmitting(false);
      onSuccess(newEnrollment);
    } catch (err: any) {
      console.error('Enrollment error:', err);
      setIsSubmitting(false);
      setError(err.message || 'Failed to complete enrollment. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#100b2a] border-2 border-purple-500/40 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden text-left my-auto">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇮🇳</span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              Official Cadet Enrollment
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Join Mission 87 Movement
          </h3>
          <p className="text-xs text-slate-300 font-semibold leading-relaxed">
            Activate your potential, receive your personalized Future Map, and unlock your verifiable Mission 87 Cadet Pass.
          </p>
        </div>

        {/* Non-Auth Notice */}
        {!user && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wide">
                Account Sign-in Required
              </h4>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                Please sign in or create an account with Google, Phone, or Email to bind your official Cadet ID.
              </p>
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Sign In / Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Enrollment Form */}
        <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-3.5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    WhatsApp / Phone (For Verification)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 font-semibold"
                  />
                </div>
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    State / UT *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 font-semibold"
                  >
                    {STATES_AND_UT_LIST.map((st) => (
                      <option key={st} value={st} className="bg-[#100b2a] text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    District *
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Khordha / Surat / Pune"
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    Town / Village (Optional)
                  </label>
                  <input
                    type="text"
                    value={townVillage}
                    onChange={(e) => setTownVillage(e.target.value)}
                    placeholder="e.g. Jatni / Barabanki"
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 font-semibold"
                  />
                </div>
              </div>

              {/* Age & Current Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    Age Group
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 font-semibold"
                  >
                    <option value="Under 18" className="bg-[#100b2a]">Under 18 (School Student)</option>
                    <option value="18-24" className="bg-[#100b2a]">18–24 (College / Job Seeker)</option>
                    <option value="25-30" className="bg-[#100b2a]">25–30 (Early Career / Builder)</option>
                    <option value="30+" className="bg-[#100b2a]">30+ (Entrepreneur / Career Switch)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                    Current Standing
                  </label>
                  <select
                    value={educationStatus}
                    onChange={(e) => setEducationStatus(e.target.value as Mission87EducationStatus)}
                    className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 font-semibold"
                  >
                    <option value="studying" className="bg-[#100b2a]">Currently Studying (School / College)</option>
                    <option value="seeking_work" className="bg-[#100b2a]">Searching for Work / First Opportunity</option>
                    <option value="left_education" className="bg-[#100b2a]">Left Formal Education Early</option>
                    <option value="skilled_unrecognized" className="bg-[#100b2a]">Have Skills / Artisan (No Degree)</option>
                    <option value="aspiring_builder" className="bg-[#100b2a]">Aspiring to Manufacture / Build Business</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!fullName.trim() || !district.trim()) {
                      setError('Please fill in your full name and district.');
                      return;
                    }
                    setError(null);
                    setStep(2);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Continue to Pathway Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              {/* Track Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider block">
                  Select Your Primary Mission Track *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'digital_business', label: 'AI Digital Business & Services', icon: Zap, color: 'text-violet-400' },
                    { id: 'manufacturing', label: 'Regional Manufacturing & ODOP', icon: Factory, color: 'text-amber-400' },
                    { id: 'agritech_food', label: 'Agri-Tech & Food Processing', icon: Sprout, color: 'text-emerald-400' },
                    { id: 'skilled_green', label: 'Solar & EV Clean Tech', icon: Sun, color: 'text-cyan-400' },
                    { id: 'creative_commerce', label: 'Handicrafts & Global Exports', icon: Palette, color: 'text-pink-400' },
                    { id: 'services_trade', label: 'Hyper-Local Trade & Tech Services', icon: Wrench, color: 'text-blue-400' }
                  ].map((tr) => {
                    const Icon = tr.icon;
                    const isSelected = primaryTrack === tr.id;
                    return (
                      <button
                        key={tr.id}
                        type="button"
                        onClick={() => setPrimaryTrack(tr.id as Mission87TrackType)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                            : 'bg-[#09061a] border-[#2b1f5c] text-slate-300 hover:border-purple-500/50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${tr.color} shrink-0`} />
                        <span className="text-xs font-bold leading-tight">{tr.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time commitment */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider">
                  Available Time Commitment
                </label>
                <select
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(e.target.value)}
                  className="w-full bg-[#09061a] border border-[#2b1f5c] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400 font-semibold"
                >
                  <option value="1-2 hours/day (Part-time)" className="bg-[#100b2a]">1–2 hours/day (Part-time / While studying)</option>
                  <option value="4-6 hours/day (Dedicated)" className="bg-[#100b2a]">4–6 hours/day (Dedicated activation)</option>
                  <option value="Full-time (8+ hours/day)" className="bg-[#100b2a]">Full-time (8+ hours/day builder)</option>
                </select>
              </div>

              {/* Equipment Checkboxes */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-purple-300 tracking-wider block">
                  Available Equipment & Resources
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Smartphone (4G/5G)',
                    'Laptop / Desktop PC',
                    'Basic Workshop / Tools',
                    'Agricultural Land / Agro-waste',
                    'Vehicle (2-wheeler/3-wheeler)'
                  ].map((eq) => {
                    const isChecked = equipment.includes(eq);
                    return (
                      <button
                        key={eq}
                        type="button"
                        onClick={() => toggleEquipment(eq)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                          isChecked
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-[#09061a] border-[#2b1f5c] text-slate-400 hover:text-white'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '} {eq}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit / Back Controls */}
              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Cadet ID & Future Map...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Enrollment & Generate Pass 🇮🇳</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
