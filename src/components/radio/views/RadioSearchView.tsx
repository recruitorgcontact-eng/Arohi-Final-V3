// Arohi Radio - Global Instant Search View
// Search across Channels, Programmes, Live Stories, Radio Stations, Cities, and Topics

import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { 
  Search, 
  Radio, 
  Play, 
  Pause, 
  FileText, 
  Globe, 
  Tag, 
  Sparkles, 
  Clock, 
  MapPin, 
  X 
} from 'lucide-react';
import { Channel, Programme, NewsStory, RadioStation } from '../types';

export const RadioSearchView: React.FC = () => {
  const {
    channels,
    stations,
    currentChannel,
    currentStation,
    playbackMode,
    isPlaying,
    playChannel,
    playProgramme,
    playStation,
    togglePlayPause
  } = useRadio();

  const [query, setQuery] = useState('');

  const trendingTags = [
    'Odia news',
    'Technology',
    'Bhubaneswar',
    'Cricket',
    'Sensex & Startups',
    'ISRO Gaganyaan',
    'Deep Focus Lo-Fi',
    'Tokyo Radio',
    'London BBC'
  ];

  const q = query.trim().toLowerCase();

  // Search Results
  const matchedChannels = q.length === 0 ? [] : channels.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q)
  );

  const matchedStories: Array<{ channel: Channel; programme: Programme; story: NewsStory }> = [];
  if (q.length > 0) {
    channels.forEach(ch => {
      ch.programmes.forEach(prog => {
        (prog.stories || []).forEach(st => {
          if (
            st.headline.toLowerCase().includes(q) ||
            st.summary.toLowerCase().includes(q) ||
            st.source.toLowerCase().includes(q) ||
            st.category.toLowerCase().includes(q)
          ) {
            matchedStories.push({ channel: ch, programme: prog, story: st });
          }
        });
      });
      // Also check current programme stories
      (ch.currentProgramme.stories || []).forEach(st => {
        if (
          !matchedStories.some(m => m.story.id === st.id) &&
          (st.headline.toLowerCase().includes(q) || st.summary.toLowerCase().includes(q))
        ) {
          matchedStories.push({ channel: ch, programme: ch.currentProgramme, story: st });
        }
      });
    });
  }

  const matchedStations = q.length === 0 ? [] : stations.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.city.toLowerCase().includes(q) ||
    s.country.toLowerCase().includes(q) ||
    s.language.toLowerCase().includes(q) ||
    s.genre.toLowerCase().includes(q)
  );

  const totalResults = matchedChannels.length + matchedStories.length + matchedStations.length;

  return (
    <div className="space-y-8 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Search Frequencies
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search across 7 channels, live stories, global stations, languages, and cities.
        </p>
      </div>

      {/* Prominent Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, channel, city, headline, or keyword..."
          className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 shadow-inner"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Trending Search Pills */}
      {query.length === 0 && (
        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
            Popular Frequency Searches:
          </span>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/5 hover:border-white/15 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Overview */}
      {query.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
            <span>Results for "{query}"</span>
            <span>{totalResults} items found</span>
          </div>

          {totalResults === 0 && (
            <div className="text-center py-12 space-y-2">
              <Radio className="w-12 h-12 mx-auto text-slate-600" />
              <h3 className="font-serif text-lg font-bold text-white">No frequency matches</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for "Odisha", "News", "Business", "Sports", "Tokyo", or "Deep Focus".
              </p>
            </div>
          )}

          {/* Section 1: Matching Channels */}
          {matchedChannels.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>Channels ({matchedChannels.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedChannels.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => playChannel(ch.id)}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.accentColor }} />
                        <span className="font-mono text-xs text-slate-400">{ch.frequency}</span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white mt-0.5">{ch.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{ch.tagline}</p>
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Matching Stories */}
          {matchedStories.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>On-Air Stories & Intelligence ({matchedStories.length})</span>
              </h3>
              <div className="space-y-2.5">
                {matchedStories.map(({ channel, programme, story }) => (
                  <div
                    key={story.id}
                    onClick={() => playProgramme(programme, channel)}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span className="text-cyan-400 font-bold">{channel.shortName}</span>
                        <span>•</span>
                        <span>{story.source}</span>
                        <span>•</span>
                        <span>{story.timestamp}</span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        {story.headline}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {story.summary}
                      </p>
                    </div>
                    <button className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 self-end sm:self-center">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Matching Stations */}
          {matchedStations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Live Geographic Stations ({matchedStations.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedStations.map((station) => (
                  <div
                    key={station.id}
                    onClick={() => playStation(station)}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                        <MapPin className="w-3 h-3" />
                        <span>{station.city}, {station.country}</span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white mt-0.5">{station.name}</h4>
                      <p className="text-xs text-slate-400">{station.language} • {station.genre}</p>
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shrink-0">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
