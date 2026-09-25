// Arohi Radio - Central Radio Player & UI State Context

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  Channel, 
  Programme, 
  NewsStory, 
  RadioStation, 
  RadioLanguage, 
  RadioTab 
} from '../types';
import { CHANNELS_DATA, getDefaultChannel } from '../data/radioChannelsData';
import { GLOBAL_RADIO_STATIONS } from '../data/globalRadioStations';
import { audioEngine } from '../services/AudioEngineService';

interface RadioContextType {
  // Navigation & View
  activeTab: RadioTab;
  setActiveTab: (tab: RadioTab) => void;

  // Active Playback State
  currentChannel: Channel;
  currentProgramme: Programme;
  currentStory: NewsStory | null;
  currentStation: RadioStation | null;
  playbackMode: 'channel' | 'station';
  isPlaying: boolean;
  isDucked: boolean;
  volume: number;
  isMuted: boolean;

  // Modals & Drawers
  isExpandedPlayerOpen: boolean;
  setIsExpandedPlayerOpen: (open: boolean) => void;
  isAskArohiOpen: boolean;
  activeStoryForAskArohi: NewsStory | null;
  openAskArohi: (story?: NewsStory) => void;
  closeAskArohi: () => void;

  // Preferences & User Data
  preferredLanguage: RadioLanguage;
  setPreferredLanguage: (lang: RadioLanguage) => void;
  favorites: string[];
  toggleFavorite: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  sleepTimerMinutes: number;
  sleepTimerSecondsRemaining: number;
  setSleepTimer: (minutes: number) => void;
  clearSleepTimer: () => void;

  // Playback Control Actions
  playChannel: (channelId: string) => void;
  playProgramme: (programme: Programme, channel?: Channel) => void;
  playStation: (station: RadioStation) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  resumeProgramme: () => void;

  // Global All Channels
  channels: Channel[];
  stations: RadioStation[];
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const RadioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<RadioTab>('home');
  const [channels] = useState<Channel[]>(CHANNELS_DATA);
  const [stations] = useState<RadioStation[]>(GLOBAL_RADIO_STATIONS);

  const [currentChannel, setCurrentChannel] = useState<Channel>(getDefaultChannel);
  const [currentProgramme, setCurrentProgramme] = useState<Programme>(() => getDefaultChannel().currentProgramme);
  const [currentStory, setCurrentStory] = useState<NewsStory | null>(() => {
    const defaultProg = getDefaultChannel().currentProgramme;
    return defaultProg.stories && defaultProg.stories.length > 0 ? defaultProg.stories[0] : null;
  });
  
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [playbackMode, setPlaybackMode] = useState<'channel' | 'station'>('channel');

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDucked, setIsDucked] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [isExpandedPlayerOpen, setIsExpandedPlayerOpen] = useState<boolean>(false);
  const [isAskArohiOpen, setIsAskArohiOpen] = useState<boolean>(false);
  const [activeStoryForAskArohi, setActiveStoryForAskArohi] = useState<NewsStory | null>(null);

  const [preferredLanguage, setPreferredLanguage] = useState<RadioLanguage>('en');
  
  // Persisted Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('arohi_radio_favorites');
      return saved ? JSON.parse(saved) : ['arohi-news', 'arohi-odisha', 'air-cuttack'];
    } catch {
      return ['arohi-news', 'arohi-odisha'];
    }
  });

  // Sleep Timer
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number>(0);
  const [sleepTimerSecondsRemaining, setSleepTimerSecondsRemaining] = useState<number>(0);

  // Synchronize audio engine volume on start
  useEffect(() => {
    audioEngine.setVolume(volume);
  }, [volume]);

  // Update sleep timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSleepTimerSecondsRemaining(audioEngine.getSleepTimerRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playChannel = useCallback((channelId: string) => {
    const channel = channels.find(c => c.id === channelId) || channels[0];
    setCurrentChannel(channel);
    setCurrentProgramme(channel.currentProgramme);
    const story = channel.currentProgramme.stories && channel.currentProgramme.stories.length > 0
      ? channel.currentProgramme.stories[0]
      : null;
    setCurrentStory(story);
    setCurrentStation(null);
    setPlaybackMode('channel');

    audioEngine.stopStream();
    audioEngine.startProceduralAmbiance(channel.currentProgramme.ambientTrackId || 'news_bulletin');
    setIsPlaying(true);
  }, [channels]);

  const playProgramme = useCallback((programme: Programme, channel?: Channel) => {
    if (channel) {
      setCurrentChannel(channel);
    }
    setCurrentProgramme(programme);
    const story = programme.stories && programme.stories.length > 0 ? programme.stories[0] : null;
    setCurrentStory(story);
    setCurrentStation(null);
    setPlaybackMode('channel');

    audioEngine.stopStream();
    audioEngine.startProceduralAmbiance(programme.ambientTrackId || 'news_bulletin');
    setIsPlaying(true);
  }, []);

  const playStation = useCallback((station: RadioStation) => {
    setCurrentStation(station);
    setPlaybackMode('station');
    setIsPlaying(true);

    audioEngine.playStream(
      station.streamUrl,
      () => setIsPlaying(true),
      () => {
        // Fallback to ambient if stream is geoblocked or offline
        audioEngine.startProceduralAmbiance('global_frequencies');
      }
    );
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioEngine.stopStream();
      audioEngine.stopProceduralAmbiance();
      audioEngine.stopSpeaking();
      setIsPlaying(false);
    } else {
      audioEngine.initAudioContext();
      if (playbackMode === 'station' && currentStation) {
        audioEngine.playStream(currentStation.streamUrl);
      } else {
        audioEngine.startProceduralAmbiance(currentProgramme.ambientTrackId || 'news_bulletin');
      }
      setIsPlaying(true);
    }
  }, [isPlaying, playbackMode, currentStation, currentProgramme]);

  const nextTrack = useCallback(() => {
    if (playbackMode === 'channel') {
      const stories = currentProgramme.stories || [];
      if (stories.length > 0 && currentStory) {
        const curIdx = stories.findIndex(s => s.id === currentStory.id);
        const nextIdx = (curIdx + 1) % stories.length;
        setCurrentStory(stories[nextIdx]);
      } else {
        // Switch to next channel
        const curChIdx = channels.findIndex(c => c.id === currentChannel.id);
        const nextCh = channels[(curChIdx + 1) % channels.length];
        playChannel(nextCh.id);
      }
    } else if (playbackMode === 'station' && currentStation) {
      const curIdx = stations.findIndex(s => s.id === currentStation.id);
      const nextIdx = (curIdx + 1) % stations.length;
      playStation(stations[nextIdx]);
    }
  }, [playbackMode, currentProgramme, currentStory, channels, currentChannel, playChannel, stations, currentStation, playStation]);

  const prevTrack = useCallback(() => {
    if (playbackMode === 'channel') {
      const stories = currentProgramme.stories || [];
      if (stories.length > 0 && currentStory) {
        const curIdx = stories.findIndex(s => s.id === currentStory.id);
        const prevIdx = (curIdx - 1 + stories.length) % stories.length;
        setCurrentStory(stories[prevIdx]);
      } else {
        const curChIdx = channels.findIndex(c => c.id === currentChannel.id);
        const prevCh = channels[(curChIdx - 1 + channels.length) % channels.length];
        playChannel(prevCh.id);
      }
    } else if (playbackMode === 'station' && currentStation) {
      const curIdx = stations.findIndex(s => s.id === currentStation.id);
      const prevIdx = (curIdx - 1 + stations.length) % stations.length;
      playStation(stations[prevIdx]);
    }
  }, [playbackMode, currentProgramme, currentStory, channels, currentChannel, playChannel, stations, currentStation, playStation]);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    audioEngine.setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
      audioEngine.setMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioEngine.setMuted(nextMute);
  }, [isMuted]);

  const toggleFavorite = useCallback((id: string): boolean => {
    let updated: string[];
    let isFavNow = false;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
      isFavNow = true;
    }
    setFavorites(updated);
    try {
      localStorage.setItem('arohi_radio_favorites', JSON.stringify(updated));
    } catch {
      // ignore
    }
    return isFavNow;
  }, [favorites]);

  const isFavorite = useCallback((id: string): boolean => {
    return favorites.includes(id);
  }, [favorites]);

  const openAskArohi = useCallback((story?: NewsStory) => {
    setActiveStoryForAskArohi(story || currentStory);
    setIsAskArohiOpen(true);
    // Smooth audio ducking
    setIsDucked(true);
    audioEngine.setDucked(true);
  }, [currentStory]);

  const closeAskArohi = useCallback(() => {
    setIsAskArohiOpen(false);
    setActiveStoryForAskArohi(null);
    audioEngine.stopSpeaking();
    setIsDucked(false);
    audioEngine.setDucked(false);
  }, []);

  const resumeProgramme = useCallback(() => {
    closeAskArohi();
    if (!isPlaying) {
      togglePlayPause();
    }
  }, [closeAskArohi, isPlaying, togglePlayPause]);

  const setSleepTimer = useCallback((minutes: number) => {
    setSleepTimerMinutes(minutes);
    audioEngine.setSleepTimer(minutes, () => {
      setIsPlaying(false);
      audioEngine.stopStream();
      audioEngine.stopProceduralAmbiance();
      setSleepTimerMinutes(0);
      setSleepTimerSecondsRemaining(0);
    });
  }, []);

  const clearSleepTimer = useCallback(() => {
    setSleepTimerMinutes(0);
    setSleepTimerSecondsRemaining(0);
    audioEngine.clearSleepTimer();
  }, []);

  return (
    <RadioContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentChannel,
        currentProgramme,
        currentStory,
        currentStation,
        playbackMode,
        isPlaying,
        isDucked,
        volume,
        isMuted,
        isExpandedPlayerOpen,
        setIsExpandedPlayerOpen,
        isAskArohiOpen,
        activeStoryForAskArohi,
        openAskArohi,
        closeAskArohi,
        preferredLanguage,
        setPreferredLanguage,
        favorites,
        toggleFavorite,
        isFavorite,
        sleepTimerMinutes,
        sleepTimerSecondsRemaining,
        setSleepTimer,
        clearSleepTimer,
        playChannel,
        playProgramme,
        playStation,
        togglePlayPause,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        resumeProgramme,
        channels,
        stations
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = (): RadioContextType => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};
