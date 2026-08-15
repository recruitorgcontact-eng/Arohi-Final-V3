import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Bot, Sparkles, Award, Menu, X, Landmark, Briefcase, Settings, User, BookOpen, FileText, ChevronDown, LogOut, LogIn, ShieldCheck, Globe, Share2, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Language, getTranslation } from '../translations';
import ArohiAvatar from './ArohiAvatar';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  onOpenAuth: () => void;
  onRevisitWelcome?: () => void;
  onStartTour?: () => void;
  onOpenSeoHub?: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onShare?: () => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const COUNTRIES_LIST = [
  { code: 'Global', name: 'Global Opportunities', flag: '🌐' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' }
] as const;

import { ALL_150_PLUS_LANGUAGES, LanguageItem } from '../data/languagesData';

export const LANGUAGES_LIST = ALL_150_PLUS_LANGUAGES;

export default function Header({ activeTab, onTabChange, onSearchChange, searchQuery, onOpenAuth, onRevisitWelcome, onStartTour, onOpenSeoHub, language, onLanguageChange, onShare, selectedCountry, onCountryChange, isDarkMode = true, onToggleTheme }: HeaderProps) {
  return null;
}
