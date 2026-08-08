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

export const LANGUAGES_LIST = [
  { code: 'en', native: 'English', symbol: 'AA', english: 'English' },
  { code: 'hi', native: 'हिंदी', english: 'Hindi', symbol: 'अ' },
  { code: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia', symbol: 'ଅ' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', symbol: 'বা' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', symbol: 'తె' },
  { code: 'mr', native: 'मराठी', english: 'Marathi', symbol: 'म' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', symbol: 'த' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', symbol: 'ગુ' },
  { code: 'ur', native: 'اردو', english: 'Urdu', symbol: 'ا' },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', symbol: 'ಕ' },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam', symbol: 'മ' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', symbol: 'ਪ' },
  { code: 'as', native: 'অসমীয়া', english: 'Assamese', symbol: 'অ' },
  { code: 'ru', native: 'Русский', english: 'Russian', symbol: 'Ру' },
  { code: 'es', native: 'Español', english: 'Spanish', symbol: 'Es' },
  { code: 'fr', native: 'Français', english: 'French', symbol: 'Fr' },
  { code: 'de', native: 'Deutsch', english: 'German', symbol: 'De' },
  { code: 'ja', native: '日本語', english: 'Japanese', symbol: '日' },
  { code: 'zh', native: '中文', english: 'Chinese', symbol: '中' },
  { code: 'ar', native: 'العربية', english: 'Arabic', symbol: 'ع' },
  { code: 'pt', native: 'Português', english: 'Portuguese', symbol: 'Pt' },
  { code: 'it', native: 'Italiano', english: 'Italian', symbol: 'It' },
  { code: 'ko', native: '한국어', english: 'Korean', symbol: '한' },
  { code: 'tr', native: 'Türkçe', english: 'Turkish', symbol: 'Tr' },
  { code: 'id', native: 'Bahasa Indonesia', english: 'Indonesian', symbol: 'Id' },
  { code: 'sw', native: 'Kiswahili', english: 'Swahili', symbol: 'Sw' },
  { code: 'am', native: 'አማርኛ', english: 'Amharic', symbol: 'አ' },
  { code: 'ha', native: 'Hausa', english: 'Hausa', symbol: 'Ha' },
  { code: 'yo', native: 'Yorùbá', english: 'Yoruba', symbol: 'Yo' },
  { code: 'zu', native: 'isiZulu', english: 'Zulu', symbol: 'Zu' }
] as const;

export default function Header({ activeTab, onTabChange, onSearchChange, searchQuery, onOpenAuth, onRevisitWelcome, onStartTour, onOpenSeoHub, language, onLanguageChange, onShare, selectedCountry, onCountryChange, isDarkMode = true, onToggleTheme }: HeaderProps) {
  return null;
}
