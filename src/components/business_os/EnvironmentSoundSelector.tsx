import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Building2,
  Headphones,
  Car,
  ChevronDown,
  Check,
  Play,
  Square,
  Sparkles
} from 'lucide-react';
import {
  BackgroundSoundType,
  BACKGROUND_SOUND_OPTIONS,
  toggleAuditionAmbientNoise,
  stopAmbientNoise,
  isAuditionPlaying
} from '../../utils/arohiAmbientNoise';

export interface EnvironmentSoundSelectorProps {
  selectedSound: BackgroundSoundType;
  onChangeSound: (sound: BackgroundSoundType) => void;
  switchLanguageDuringCall?: boolean;
  onToggleSwitchLanguage?: (enabled: boolean) => void;
  className?: string;
  showLanguageToggle?: boolean;
}

export default function EnvironmentSoundSelector({
  selectedSound,
  onChangeSound,
  switchLanguageDuringCall = true,
  onToggleSwitchLanguage,
  className = '',
  showLanguageToggle = true
}: EnvironmentSoundSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuditioning, setIsAuditioning] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Stop audition when unmounting
  useEffect(() => {
    return () => {
      stopAmbientNoise();
    };
  }, []);

  const handleAuditionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSound === 'none') {
      // If no sound is selected, preview 'office' as demonstration or alert
      toggleAuditionAmbientNoise('office', (playing) => {
        setIsAuditioning(playing);
      });
      return;
    }

    toggleAuditionAmbientNoise(selectedSound, (playing) => {
      setIsAuditioning(playing);
    });
  };

  const getIcon = (id: BackgroundSoundType) => {
    switch (id) {
      case 'none':
        return <VolumeX className="w-4 h-4 text-zinc-500" />;
      case 'office':
        return <Building2 className="w-4 h-4 text-blue-500" />;
      case 'call_center':
        return <Headphones className="w-4 h-4 text-purple-500" />;
      case 'traffic':
        return <Car className="w-4 h-4 text-amber-500" />;
    }
  };

  const currentOption = BACKGROUND_SOUND_OPTIONS.find((o) => o.id === selectedSound) || BACKGROUND_SOUND_OPTIONS[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
          Environment
        </h3>
      </div>

      {/* Row 1: Background sound */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <div className="space-y-0.5">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Background sound
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Ambient noise behind the agent
          </p>
        </div>

        {/* Controls: Dropdown + Audition Play Button */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          {/* Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 px-3.5 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-2.5 transition-all shadow-xs min-w-[150px] justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {getIcon(selectedSound)}
                <span>{currentOption.label}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-1.5 w-60 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {BACKGROUND_SOUND_OPTIONS.map((option) => {
                  const isSelected = option.id === selectedSound;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        onChangeSound(option.id);
                        setIsOpen(false);
                        if (isAuditioning) {
                          stopAmbientNoise();
                          setIsAuditioning(false);
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-100/80 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {getIcon(option.id)}
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">
                            {option.description}
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Audition Preview Play/Stop Button */}
          <button
            type="button"
            onClick={handleAuditionToggle}
            title={isAuditioning ? 'Stop ambient preview' : 'Audition background sound'}
            className={`w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isAuditioning
                ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {isAuditioning ? (
              <Square className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Language personalisation */}
      {showLanguageToggle && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Language personalisation
            </h4>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Switch language during call
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Follow along when the caller switches languages
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={switchLanguageDuringCall}
              onClick={() => onToggleSwitchLanguage?.(!switchLanguageDuringCall)}
              className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 cursor-pointer focus:outline-hidden ${
                switchLanguageDuringCall
                  ? 'bg-black dark:bg-zinc-100'
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-white dark:bg-zinc-900 shadow-md transform transition-transform ${
                  switchLanguageDuringCall ? 'translate-x-5.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
