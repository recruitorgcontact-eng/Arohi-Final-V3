import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Share2, 
  Globe, 
  Tag, 
  Calendar, 
  Clock, 
  Eye, 
  Copy, 
  Check, 
  ExternalLink, 
  TrendingUp, 
  ArrowLeft, 
  Code, 
  Bookmark, 
  MessageCircle,
  BookOpen,
  Send,
  Zap,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { 
  BlogPost, 
  BLOG_CATEGORIES, 
  INDIAN_LANGUAGES_BLOG, 
  generateDynamicBlogsList 
} from '../data/blogsData';

interface BlogPageProps {
  onNavigateTab: (tab: string) => void;
  initialBlogId?: string | null;
  currentLanguage?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  onNavigateTab, 
  initialBlogId,
  currentLanguage = 'en'
}) => {
  const [selectedLang, setSelectedLang] = useState<string>(currentLanguage || 'en');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);
  const [savedBlogs, setSavedBlogs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('arohi_saved_blogs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync currentLanguage if changed externally
  useEffect(() => {
    if (currentLanguage && INDIAN_LANGUAGES_BLOG.some(l => l.code === currentLanguage)) {
      setSelectedLang(currentLanguage);
    }
  }, [currentLanguage]);

  // Load initial blog if passed
  useEffect(() => {
    if (initialBlogId) {
      const allList = generateDynamicBlogsList('', 'all', selectedLang);
      const found = allList.find(b => b.id === initialBlogId || b.slug === initialBlogId);
      if (found) {
        setSelectedBlog(found);
      }
    }
  }, [initialBlogId, selectedLang]);

  // Save/Unsave blog
  const toggleSaveBlog = (blogId: string) => {
    let updated: string[];
    if (savedBlogs.includes(blogId)) {
      updated = savedBlogs.filter(id => id !== blogId);
    } else {
      updated = [...savedBlogs, blogId];
    }
    setSavedBlogs(updated);
    try {
      localStorage.setItem('arohi_saved_blogs', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update saved blogs', e);
    }
  };

  // Generate dynamic blogs array based on search and category
  const blogList = useMemo(() => {
    return generateDynamicBlogsList(searchQuery, activeCategory, selectedLang);
  }, [searchQuery, activeCategory, selectedLang]);

  // Featured blog (first trending or first item)
  const featuredBlog = useMemo(() => {
    return blogList.find(b => b.isFeatured) || blogList[0];
  }, [blogList]);

  // Helper for localized text lookup
  const getLocalizedText = (blog: BlogPost, field: 'title' | 'summary' | 'content') => {
    if (blog[field] && blog[field][selectedLang]) {
      return blog[field][selectedLang];
    }
    if (blog[field] && blog[field]['en']) {
      return blog[field]['en'];
    }
    return '';
  };

  // Direct Shareable URL for the blog post
  const getBlogShareUrl = (blog: BlogPost) => {
    return `https://arohiai.com/?tab=blogs&blog=${blog.id}`;
  };

  // HTML backlink embed snippet
  const getBlogEmbedCode = (blog: BlogPost) => {
    const title = getLocalizedText(blog, 'title');
    const shareUrl = getBlogShareUrl(blog);
    return `<a href="${shareUrl}" rel="dofollow" title="${title}">${title} - Arohi AI Multilingual Hub</a>`;
  };

  const handleCopyLink = (blog: BlogPost) => {
    navigator.clipboard.writeText(getBlogShareUrl(blog));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyEmbed = (blog: BlogPost) => {
    navigator.clipboard.writeText(getBlogEmbedCode(blog));
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  // Structured Data (JSON-LD) for SEO search engines
  useEffect(() => {
    if (!selectedBlog) return;

    const blogTitle = getLocalizedText(selectedBlog, 'title');
    const blogSummary = getLocalizedText(selectedBlog, 'summary');
    const blogUrl = getBlogShareUrl(selectedBlog);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": blogUrl
      },
      "headline": blogTitle,
      "description": blogSummary,
      "image": [selectedBlog.author.avatar],
      "datePublished": "2026-08-01T08:00:00+05:30",
      "dateModified": "2026-08-04T10:00:00+05:30",
      "author": {
        "@type": "Person",
        "name": selectedBlog.author.name,
        "jobTitle": selectedBlog.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "Arohi AI",
        "url": "https://arohiai.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://arohiai.com/pwa-192x192.png"
        }
      },
      "inLanguage": selectedLang,
      "keywords": selectedBlog.tags.join(", ")
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-blog-schema';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-blog-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [selectedBlog, selectedLang]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. HERO BANNER & KNOWLEDGE HUB HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#130c2e] via-[#1a123d] to-[#090617] border border-[#2d2163] rounded-3xl p-6 sm:p-10 shadow-2xl text-left">
        {/* Background Ambient Flares */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/35 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Arohi AI Knowledge & Trending SEO Blogs 🇮🇳</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              100+ Trending Articles &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] via-[#e879f9] to-[#38bdf8]">
                Multilingual SEO Guidance
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Explore active current topics trending in India — Sarkari Jobs, PM Schemes, MSME Grants, Resume ATS Hacks, CBSE/Board Syllabus &amp; AI Innovations. Every article includes direct contextual link backs to Arohi AI interactive engines.
            </p>
          </div>

          {/* Indian Language Selector Box */}
          <div className="bg-[#120e2a] border border-[#30236a] rounded-2xl p-4 space-y-2.5 shrink-0 shadow-lg min-w-[260px]">
            <label className="text-[10px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Blog Language (12+ Indian Languages)</span>
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full bg-[#0a0718] text-white border border-[#3b2b80] rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#7c3aed] cursor-pointer"
            >
              {INDIAN_LANGUAGES_BLOG.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-[#120e2a] text-white">
                  {lang.flag} {lang.name} ({lang.label})
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 font-semibold">
              Currently displaying content in <span className="text-purple-300 font-bold">{INDIAN_LANGUAGES_BLOG.find(l => l.code === selectedLang)?.name || 'English'}</span>
            </p>
          </div>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="mt-8 pt-6 border-t border-[#261c52] flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100+ trending topics (e.g. SSC CGL 2026, PM Mudra Loan, Subhadra Yojana, ATS Resume)..."
              className="w-full bg-[#0a0718]/90 text-white border border-[#2d2163] focus:border-[#7c3aed] rounded-2xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none transition-all placeholder-slate-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-bold px-2 py-1 bg-white/5 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 shrink-0">
            <span className="bg-[#1c153d] border border-[#382a80] px-3 py-2 rounded-xl text-purple-300 font-black">
              Showing {blogList.length} Trending Articles
            </span>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
        {BLOG_CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white border-[#9061f9] shadow-lg scale-105'
                  : 'bg-[#120d2a]/80 text-slate-300 hover:text-white border-[#241b4e] hover:border-[#3d2f82]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. DETAIL VIEW MODAL (When a blog is selected) */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0e0924] border-2 border-[#5231a3]/70 text-slate-100 rounded-[2.5rem] max-w-4xl w-full p-6 sm:p-10 space-y-6 shadow-[0_0_80px_rgba(124,58,237,0.35)] relative my-8 text-left animate-in zoom-in-95 duration-200">
            
            {/* Modal Navigation Header */}
            <div className="flex justify-between items-center border-b border-[#241b4e] pb-4">
              <button
                onClick={() => setSelectedBlog(null)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1b1442] hover:bg-[#281f5c] text-purple-300 hover:text-white border border-[#3b2b80] text-xs font-black transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Blogs</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveBlog(selectedBlog.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    savedBlogs.includes(selectedBlog.id)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#181238] text-slate-300 border-[#2f2363] hover:text-white'
                  }`}
                  title={savedBlogs.includes(selectedBlog.id) ? 'Saved in Bookmarks' : 'Save Bookmark'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#7c3aed]/20 text-[#c084fc] border border-[#7c3aed]/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {selectedBlog.categoryLabel}
                </span>
                <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {selectedBlog.trendingTag}
                </span>
                <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {INDIAN_LANGUAGES_BLOG.find(l => l.code === selectedLang)?.name}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                {getLocalizedText(selectedBlog, 'title')}
              </h2>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#211847] text-xs text-slate-400 font-semibold">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedBlog.author.avatar}
                    alt={selectedBlog.author.name}
                    className="w-10 h-10 rounded-full border border-purple-400/40 object-cover"
                  />
                  <div>
                    <p className="font-extrabold text-slate-200 leading-tight">{selectedBlog.author.name}</p>
                    <p className="text-[10px] text-purple-300 font-medium">{selectedBlog.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" /> {selectedBlog.publishDate}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {selectedBlog.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Eye className="w-3.5 h-3.5 text-sky-400" /> {selectedBlog.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </div>

            {/* Key Takeaways Box */}
            {selectedBlog.keyTakeaways && (
              <div className="bg-gradient-to-r from-[#17103a] to-[#1d1348] border border-[#3b2b80] rounded-2xl p-5 space-y-2.5">
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Key Summary &amp; Takeaways</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-200 font-medium">
                  {(selectedBlog.keyTakeaways[selectedLang] || selectedBlog.keyTakeaways['en'] || []).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-black">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contextual LinkBacks Banner */}
            <div className="bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-purple-950/60 border border-purple-500/40 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-black uppercase text-purple-300 tracking-widest block font-mono">
                🔗 Contextual Service Linkbacks (Click to Launch Feature Directly)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedBlog.linkbacks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedBlog(null);
                      onNavigateTab(link.tab);
                    }}
                    className="p-3 bg-[#17113a] hover:bg-[#231a54] border border-[#392a80] hover:border-purple-400 rounded-xl text-left transition-all cursor-pointer group active:scale-95"
                  >
                    <p className="text-xs font-black text-amber-300 group-hover:text-white flex items-center justify-between">
                      <span>{link.anchorText}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-1" />
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1 line-clamp-2">
                      {link.context}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Rich Content */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-200 space-y-4 bg-[#0a0718] p-6 rounded-2xl border border-[#211847]">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: getLocalizedText(selectedBlog, 'content')
                    .replace(/\n\n/g, '<br/><br/>')
                    .replace(/### (.*)/g, '<h3 class="text-lg font-black text-white mt-4 mb-2 border-b border-[#2c205e] pb-1">$1</h3>')
                    .replace(/#### (.*)/g, '<h4 class="text-sm font-black text-amber-300 mt-3 mb-1">$1</h4>')
                    .replace(/\[(.*?)\]\(\/\?tab=(.*?)\)/g, '<a href="/?tab=$2" class="text-purple-300 hover:text-white underline font-bold" data-tab="$2">$1</a>')
                }} 
              />
            </div>

            {/* SEO Backlink & Embed Copy Section */}
            <div className="bg-[#120d2e] border border-[#2d2163] rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-emerald-400" />
                    <span>SEO Backlink &amp; HTML Embed Code</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Are you a blogger or webmaster? Share or backlink this article to improve page searchability and domain authority.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Copy Direct URL */}
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 font-mono">Direct Share URL</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={getBlogShareUrl(selectedBlog)}
                      className="flex-1 bg-[#0a0718] border border-[#2a1d59] rounded-xl px-3 py-2 text-[11px] font-mono text-slate-300 select-all"
                    />
                    <button
                      onClick={() => handleCopyLink(selectedBlog)}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Copy HTML Link Back Code */}
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-slate-400 font-mono">HTML Backlink Embed Tag</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={getBlogEmbedCode(selectedBlog)}
                      className="flex-1 bg-[#0a0718] border border-[#2a1d59] rounded-xl px-3 py-2 text-[10px] font-mono text-slate-300 select-all"
                    />
                    <button
                      onClick={() => handleCopyEmbed(selectedBlog)}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                      <span>{copiedEmbed ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Share Bar */}
              <div className="pt-2 border-t border-[#211847] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-300">Share on Social Media:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getLocalizedText(selectedBlog, 'title') + ' ' + getBlogShareUrl(selectedBlog))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(getBlogShareUrl(selectedBlog))}&text=${encodeURIComponent(getLocalizedText(selectedBlog, 'title'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold hover:bg-sky-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Telegram
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getLocalizedText(selectedBlog, 'title'))}&url=${encodeURIComponent(getBlogShareUrl(selectedBlog))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white/10 text-white border border-white/20 rounded-xl text-xs font-bold hover:bg-white/20 transition-all"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. FEATURED BLOG CAROUSEL CARD */}
      {featuredBlog && !selectedBlog && (
        <div className="bg-gradient-to-r from-[#17103a] via-[#1d1447] to-[#120a2e] border border-[#3b2b80] rounded-3xl p-6 sm:p-8 shadow-xl text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  ⭐ Featured Trending Article
                </span>
                <span className="bg-[#7c3aed]/20 text-[#c084fc] border border-[#7c3aed]/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {featuredBlog.categoryLabel}
                </span>
              </div>

              <h2 
                onClick={() => setSelectedBlog(featuredBlog)}
                className="text-2xl sm:text-3xl font-black text-white hover:text-purple-300 transition-colors cursor-pointer leading-tight"
              >
                {getLocalizedText(featuredBlog, 'title')}
              </h2>

              <p className="text-xs text-slate-300 font-medium leading-relaxed line-clamp-3">
                {getLocalizedText(featuredBlog, 'summary')}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> {featuredBlog.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> {featuredBlog.readTime}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setSelectedBlog(featuredBlog)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full Blog Article</span>
                </button>

                <button
                  onClick={() => {
                    onNavigateTab(featuredBlog.relatedTab);
                  }}
                  className="px-4 py-2.5 bg-[#181238] hover:bg-[#251a54] text-purple-300 border border-[#392a80] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{featuredBlog.relatedTabLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MAIN BLOG GRID (100+ BLOG ARTICLES) */}
      <div className="space-y-4 text-left">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <span>Trending Indian Career &amp; Government Blogs ({blogList.length})</span>
          </h3>

          <span className="text-xs text-slate-400 font-semibold">
            Filtered in <strong className="text-purple-300">{INDIAN_LANGUAGES_BLOG.find(l => l.code === selectedLang)?.name}</strong>
          </span>
        </div>

        {blogList.length === 0 ? (
          <div className="bg-[#120d2a] border border-[#2d2163] p-12 rounded-3xl text-center space-y-3">
            <p className="text-base text-slate-300 font-bold">No blog posts found matching "{searchQuery}".</p>
            <p className="text-xs text-slate-400">Try resetting your search filter or selecting another category.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogList.map((blog) => {
              const titleText = getLocalizedText(blog, 'title');
              const summaryText = getLocalizedText(blog, 'summary');
              const isSaved = savedBlogs.includes(blog.id);

              return (
                <div
                  key={blog.id}
                  className="bg-[#110c28]/90 hover:bg-[#161033] border border-[#241a52] hover:border-[#5337a8] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-lg group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] bg-[#21164c] text-[#c084fc] border border-[#402d8f] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                        {blog.categoryLabel}
                      </span>

                      <button
                        onClick={() => toggleSaveBlog(blog.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSaved ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={isSaved ? 'Saved' : 'Save bookmark'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <h4 
                      onClick={() => setSelectedBlog(blog)}
                      className="text-base font-black text-slate-100 group-hover:text-purple-300 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {titleText}
                    </h4>

                    <p className="text-xs text-slate-400 font-medium line-clamp-3 leading-relaxed">
                      {summaryText}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1e1542] space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" /> {blog.publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" /> {blog.readTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="text-xs font-black text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Full Blog</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onNavigateTab(blog.relatedTab)}
                        className="text-[10px] bg-[#1a123d] hover:bg-[#251b57] text-amber-300 border border-[#3b2a80] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>Launch Tool</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. BACKLINK & SEO INFORMATION BANNER FOR MARKETERS & VISITORS */}
      <div className="bg-[#100b26] border border-[#261c54] rounded-3xl p-6 sm:p-8 space-y-4 text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-black text-white uppercase tracking-wider">
            SEO &amp; Searchability Linkback Guarantee
          </h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Arohi AI blogs are formatted with Schema.org JSON-LD structured data and canonical anchor tags. Content creators, news publishers, and students can cite or backlink to any article (`https://arohiai.com/?tab=blogs&amp;blog=&lt;id&gt;`) to enhance search engine indexation and contextual relevance across Indian search engines.
        </p>
      </div>

    </div>
  );
};
