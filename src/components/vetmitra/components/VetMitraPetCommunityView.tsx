// Arohi VetMitra - Pet Owner Social Media & Pet Industry Showcase
// Global community feed with public/private visibility, pet parent interactions,
// and curated veterinary & pet industry products and services directory.

import React, { useState, useEffect } from 'react';
import { 
  Heart, MessageCircle, Share2, Globe, Lock, Users, Sparkles, 
  Tag, Search, Plus, Stethoscope, CheckCircle2, Star,
  ExternalLink, ShoppingBag, Phone, Filter, ShieldCheck, ChevronRight,
  Camera, Image as ImageIcon, Send, X, ArrowLeft, Bookmark
} from 'lucide-react';
import { VetLanguage, VetSpecies, PetSocialPost, PetIndustryProduct, PetPostVisibility, PetIndustryCategory } from '../types';
import { SEED_PET_POSTS, PET_INDUSTRY_PRODUCTS } from '../data/petSocialData';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';

interface Props {
  language: VetLanguage;
  activeAnimal?: { id: string; name: string; species: VetSpecies; breed?: string; photoUrl?: string };
  onBackToHome: () => void;
  onAskVetMitra: (contextText: string, species?: VetSpecies) => void;
  onOpenVoiceCall: () => void;
}

export const VetMitraPetCommunityView: React.FC<Props> = ({
  language,
  activeAnimal,
  onBackToHome,
  onAskVetMitra,
  onOpenVoiceCall,
}) => {
  const isOdia = language === 'or';
  const isHindi = language === 'hi';

  // Sub-tabs: 'feed' (Social Community) | 'marketplace' (Industry Showcase)
  const [activeSubTab, setActiveSubTab] = useState<'feed' | 'marketplace'>('feed');

  // Posts state initialized from localStorage or seed data
  const [posts, setPosts] = useState<PetSocialPost[]>(() => {
    try {
      const cached = localStorage.getItem('arohi_vetmitra_pet_posts');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn('Could not load cached pet posts:', e);
    }
    return SEED_PET_POSTS;
  });

  // Filters for feed
  const [feedFilter, setFeedFilter] = useState<'all' | 'public' | 'private' | 'dog' | 'cat' | 'cattle' | 'goat'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // New Post Composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postVisibility, setPostVisibility] = useState<PetPostVisibility>('public');
  const [selectedSpecies, setSelectedSpecies] = useState<VetSpecies>(activeAnimal?.species || 'dog');
  const [petNameInput, setPetNameInput] = useState(activeAnimal?.name || '');
  const [petBreedInput, setPetBreedInput] = useState(activeAnimal?.breed || '');
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string>(activeAnimal?.photoUrl || VET_STOCK_IMAGES.dogPlayBeach);
  const [customPhotoInput, setCustomPhotoInput] = useState('');
  const [postTagInput, setPostTagInput] = useState('');

  // Marketplace Filters
  const [marketCategory, setMarketCategory] = useState<'all' | PetIndustryCategory>('all');
  const [marketSpecies, setMarketSpecies] = useState<'all' | VetSpecies>('all');
  const [marketSearch, setMarketSearch] = useState('');

  // Comment expansion state: postId -> boolean
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  // Active product detail modal
  const [activeProductModal, setActiveProductModal] = useState<PetIndustryProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist posts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('arohi_vetmitra_pet_posts', JSON.stringify(posts));
    } catch (e) {
      console.warn('Could not persist pet posts:', e);
    }
  }, [posts]);

  // Handle Like Toggle
  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const wasLiked = !!post.isLiked;
        return {
          ...post,
          isLiked: !wasLiked,
          likesCount: wasLiked ? Math.max(0, post.likesCount - 1) : post.likesCount + 1,
        };
      }
      return post;
    }));
  };

  // Handle Adding a Comment
  const addComment = (postId: string) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    const newComment = {
      id: 'c-' + Date.now(),
      authorName: 'You (Pet Parent)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      content: text,
      createdAt: 'Just now',
      likesCount: 0,
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
    showToast(isOdia ? 'ମତାମତ ପୋଷ୍ଟ ହୋଇଛି!' : 'Comment posted successfully!');
  };

  // Handle Publishing New Post
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      showToast(isOdia ? 'ଦୟାକରି କିଛି ଲେଖନ୍ତୁ' : 'Please write something to share');
      return;
    }

    const tagsArray = postTagInput
      ? postTagInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean)
      : ['PetCare', selectedSpecies === 'cattle' ? 'DairyFarm' : selectedSpecies];

    const newPost: PetSocialPost = {
      id: 'post-' + Date.now(),
      authorId: 'user-current',
      authorName: 'You (Pet Parent / Farmer)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      authorLocation: 'Odisha, India',
      petName: petNameInput.trim() || (selectedSpecies === 'cattle' ? 'Gouri' : 'Pet'),
      petSpecies: selectedSpecies,
      petBreed: petBreedInput.trim() || undefined,
      petAge: 'Active',
      content: postContent.trim(),
      mediaUrl: customPhotoInput.trim() || selectedPhotoUrl,
      mediaType: 'image',
      visibility: postVisibility,
      tags: tagsArray,
      likesCount: 1,
      isLiked: true,
      commentsCount: 0,
      comments: [],
      createdAt: 'Just now',
      askVetMitraContext: `Community post regarding ${selectedSpecies} (${petNameInput}): ${postContent.trim()}`,
    };

    setPosts(prev => [newPost, ...prev]);
    setIsComposerOpen(false);
    setPostContent('');
    setPostTagInput('');
    setCustomPhotoInput('');

    showToast(
      postVisibility === 'private'
        ? (isOdia ? 'ବ୍ୟକ୍ତିଗତ ପେଟ୍ ଡାଏରୀରେ ସୁରକ୍ଷିତ ହେଲା!' : 'Saved to your Private Pet Health Journal!')
        : (isOdia ? 'ସାରା ବିଶ୍ୱର ପେଟ୍ କମ୍ୟୁନିଟିରେ ପୋଷ୍ଟ ହେଲା!' : 'Published to Worldwide Pet Community!')
    );
  };

  // Filtered Posts
  const filteredPosts = posts.filter(post => {
    if (feedFilter === 'public' && post.visibility !== 'public') return false;
    if (feedFilter === 'private' && post.visibility !== 'private') return false;
    if (feedFilter === 'dog' && post.petSpecies !== 'dog') return false;
    if (feedFilter === 'cat' && post.petSpecies !== 'cat') return false;
    if (feedFilter === 'cattle' && post.petSpecies !== 'cattle') return false;
    if (feedFilter === 'goat' && post.petSpecies !== 'goat') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = (post.content || '').toLowerCase();
      const matchAuthor = (post.authorName || '').toLowerCase();
      const matchPet = (post.petName || '').toLowerCase();
      const matchTags = (post.tags || []).some(t => t.toLowerCase().includes(q));
      return matchText.includes(q) || matchAuthor.includes(q) || matchPet.includes(q) || matchTags;
    }
    return true;
  });

  // Filtered Products
  const filteredProducts = PET_INDUSTRY_PRODUCTS.filter(prod => {
    if (marketCategory !== 'all' && prod.category !== marketCategory) return false;
    if (marketSpecies !== 'all' && !prod.species.includes(marketSpecies)) return false;

    if (marketSearch.trim()) {
      const q = marketSearch.toLowerCase();
      const matchName = prod.name.toLowerCase();
      const matchBrand = prod.brand.toLowerCase();
      const matchDesc = prod.description.toLowerCase();
      return matchName.includes(q) || matchBrand.includes(q) || matchDesc.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-emerald-400 border border-emerald-500/40 px-4 py-2 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                PET SOCIAL & INDUSTRY HUB
              </span>
              <span className="text-xs text-emerald-300/80">• Worldwide & Regional</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{isOdia ? 'ପୋଷା ପଶୁ କମ୍ୟୁନିଟି ଓ ଉତ୍ପାଦ ବଜାର' : 'Pet Community & Industry Showcase'}</span>
            </h2>
            <p className="text-xs text-emerald-100/80 mt-0.5 max-w-xl">
              {isOdia
                ? 'ପୋଷା ଜୀବ ପାଳକଙ୍କ ସହିତ ଫଟୋ ଓ ଅନୁଭୂତି ବାଣ୍ଟନ୍ତୁ, ପ୍ରାଇଭେଟ୍ ଜର୍ଣ୍ଣାଲ୍ ଲେଖନ୍ତୁ ଏବଂ ବିଶ୍ୱସନୀୟ ଖାଦ୍ୟ, ସେବା ଓ ଡାକ୍ତରଖାନା ଖୋଜନ୍ତୁ।'
                : 'Connect with pet parents globally, share recovery stories or private pet journals, and explore verified nutrition, medicines, grooming & veterinary clinics.'}
            </p>
          </div>

          {/* New Post Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComposerOpen(true)}
              className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/50 transition-transform active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>{isOdia ? 'ପୋଷ୍ଟ କରନ୍ତୁ' : 'Create Post'}</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors shrink-0"
            >
              {isOdia ? 'ମୂଳକୁ ଫେରନ୍ତୁ' : 'Back to Home'}
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Switcher */}
        <div className="relative z-10 flex items-center gap-2 mt-5 border-t border-emerald-800/60 pt-3">
          <button
            onClick={() => setActiveSubTab('feed')}
            className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all ${
              activeSubTab === 'feed'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isOdia ? 'ସାମାଜିକ ଫିଡ୍ (Pet Community)' : 'Community Feed'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {filteredPosts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('marketplace')}
            className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all ${
              activeSubTab === 'marketplace'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOdia ? 'ଉତ୍ପାଦ ଓ ସେବା (Marketplace)' : 'Products & Services Showcase'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 font-bold">
              {PET_INDUSTRY_PRODUCTS.length}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COMMUNITY SOCIAL FEED */}
      {/* ========================================================================= */}
      {activeSubTab === 'feed' && (
        <div className="space-y-4">
          {/* Quick Post Prompt Card */}
          <div 
            onClick={() => setIsComposerOpen(true)}
            className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:border-emerald-400 transition-all group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                alt="Your Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 bg-slate-50 group-hover:bg-emerald-50/50 rounded-2xl px-4 py-2.5 text-xs text-slate-400 group-hover:text-emerald-800 transition-colors">
              {isOdia
                ? 'ଆପଣଙ୍କ ପୋଷା ଜୀବର ଫଟୋ, ସ୍ୱାସ୍ଥ୍ୟ ଅନୁଭୂତି ବା ପ୍ରଶ୍ନ ପୋଷ୍ଟ କରନ୍ତୁ...'
                : 'Share a photo, recovery story, or question with pet parents worldwide...'}
            </div>
            <button className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
              <ImageIcon className="w-4 h-4" />
              <span>{isOdia ? 'ଫଟୋ' : 'Photo'}</span>
            </button>
          </div>

          {/* Feed Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: isOdia ? 'ସମସ୍ତ' : 'All Posts' },
                { id: 'public', label: isOdia ? '🌍 ସାର୍ବଜନୀନ' : '🌍 Public' },
                { id: 'private', label: isOdia ? '🔒 ବ୍ୟକ୍ତିଗତ ଜର୍ଣ୍ଣାଲ୍' : '🔒 My Journal' },
                { id: 'dog', label: '🐶 Dogs' },
                { id: 'cat', label: '🐱 Cats' },
                { id: 'cattle', label: '🐄 Cattle' },
                { id: 'goat', label: '🐐 Goats' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFeedFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    feedFilter === f.id
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isOdia ? 'ସନ୍ଧାନ କରନ୍ତୁ (ପୋଷ୍ଟ, ଟ୍ୟାଗ୍)...' : 'Search posts, tags...'}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
              />
            </div>
          </div>

          {/* Posts Stream */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2">
                <p className="text-sm font-bold text-slate-700">
                  {isOdia ? 'କୌଣସି ପୋଷ୍ଟ ମିଳିଲା ନାହିଁ' : 'No posts matching your filter'}
                </p>
                <p className="text-xs text-slate-500">
                  {isOdia ? 'ପ୍ରଥମ ପୋଷ୍ଟ ଲେଖି କମ୍ୟୁନିଟି ସହିତ ସଂଯୋଗ ହୁଅନ୍ତୁ।' : 'Be the first to share your pet story or question!'}
                </p>
                <button
                  onClick={() => setIsComposerOpen(true)}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  {isOdia ? 'ନୂଆ ପୋଷ୍ଟ କରନ୍ତୁ' : 'Create Post'}
                </button>
              </div>
            ) : (
              filteredPosts.map(post => {
                const isExpanded = !!expandedComments[post.id];
                const commentText = commentInputs[post.id] || '';

                return (
                  <article 
                    key={post.id}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Post Header */}
                    <div className="p-4 sm:p-5 pb-3 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-black text-slate-900">{post.authorName}</h4>
                            {post.authorLocation && (
                              <span className="text-[11px] text-slate-400">• {post.authorLocation}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60">
                              🐾 {post.petName} {post.petBreed ? `(${post.petBreed})` : ''} {post.petAge ? `• ${post.petAge}` : ''}
                            </span>
                            <span className="text-slate-400">{post.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Privacy Badge */}
                      <div className="shrink-0">
                        {post.visibility === 'public' && (
                          <span className="px-2 py-1 rounded-xl bg-blue-50 text-blue-700 text-[10px] font-bold flex items-center gap-1 border border-blue-200">
                            <Globe className="w-3 h-3 text-blue-600" />
                            <span>Public</span>
                          </span>
                        )}
                        {post.visibility === 'private' && (
                          <span className="px-2 py-1 rounded-xl bg-amber-50 text-amber-800 text-[10px] font-bold flex items-center gap-1 border border-amber-200">
                            <Lock className="w-3 h-3 text-amber-600" />
                            <span>Private Journal</span>
                          </span>
                        )}
                        {post.visibility === 'followers' && (
                          <span className="px-2 py-1 rounded-xl bg-purple-50 text-purple-700 text-[10px] font-bold flex items-center gap-1 border border-purple-200">
                            <Users className="w-3 h-3 text-purple-600" />
                            <span>Followers</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 sm:px-5 pb-3">
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        {isOdia && post.contentOdia ? post.contentOdia : post.content}
                      </p>

                      {/* Hashtag Chips */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded-lg"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Media (Photo) */}
                    {post.mediaUrl && (
                      <div className="w-full bg-slate-950 max-h-[420px] overflow-hidden flex items-center justify-center">
                        <img
                          src={post.mediaUrl}
                          alt={post.petName}
                          className="w-full h-auto max-h-[420px] object-cover"
                        />
                      </div>
                    )}

                    {/* Tagged Products Showcase inside Post */}
                    {post.taggedProductIds && post.taggedProductIds.length > 0 && (
                      <div className="px-4 sm:px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1 shrink-0">
                          <Tag className="w-3 h-3 text-emerald-600" />
                          <span>Tagged Products:</span>
                        </span>
                        {post.taggedProductIds.map(prodId => {
                          const prod = PET_INDUSTRY_PRODUCTS.find(p => p.id === prodId);
                          if (!prod) return null;
                          return (
                            <button
                              key={prod.id}
                              onClick={() => setActiveProductModal(prod)}
                              className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-[11px] font-bold text-slate-800 flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                            >
                              <span>🏷️ {prod.name.slice(0, 24)}...</span>
                              <span className="text-emerald-600 font-extrabold">{prod.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Action Bar (Like, Comment, Ask VetMitra, Share) */}
                    <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        {/* Like / Paw-Up Button */}
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold transition-all active:scale-90 ${
                            post.isLiked
                              ? 'text-rose-600 font-black'
                              : 'text-slate-600 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                          <span>{post.likesCount}</span>
                          <span className="hidden sm:inline">{post.likesCount === 1 ? 'Paw Up' : 'Paws Up'}</span>
                        </button>

                        {/* Comments Toggle */}
                        <button
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !isExpanded }))}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.commentsCount}</span>
                          <span className="hidden sm:inline">Comments</span>
                        </button>
                      </div>

                      {/* Right Actions: 1-Tap "Ask VetMitra about this" & Share */}
                      <div className="flex items-center gap-2">
                        {post.askVetMitraContext && (
                          <button
                            onClick={() => onAskVetMitra(post.askVetMitraContext!, post.petSpecies)}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 transition-colors"
                            title="Ask Arohi VetMitra for clinical advice based on this post"
                          >
                            <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="hidden sm:inline">{isOdia ? 'ଭେଟମିତ୍ର ପଚାରନ୍ତୁ' : 'Ask VetMitra'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(window.location.href);
                            }
                            showToast(isOdia ? 'ଲିଙ୍କ୍ କପି ହୋଇଛି!' : 'Post link copied to clipboard!');
                          }}
                          className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Share"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Comments Section */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 py-3 bg-slate-50/80 border-t border-slate-100 space-y-3">
                        {/* Comments List */}
                        {post.comments && post.comments.length > 0 ? (
                          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                            {post.comments.map(c => (
                              <div key={c.id} className="flex items-start gap-2.5 bg-white p-2.5 rounded-2xl border border-slate-200/80 text-xs shadow-xs">
                                <img
                                  src={c.authorAvatar}
                                  alt={c.authorName}
                                  className="w-7 h-7 rounded-full object-cover shrink-0"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <span className="font-bold text-slate-900">{c.authorName}</span>
                                    <span className="text-slate-400 text-[10px]">{c.createdAt}</span>
                                  </div>
                                  <p className="text-slate-700 mt-0.5">{c.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">
                            {isOdia ? 'ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ମତାମତ ନାହିଁ। ପ୍ରଥମ ମତାମତ ଦିଅନ୍ତୁ!' : 'No comments yet. Be the first to chime in!'}
                          </p>
                        )}

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={commentText}
                            onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                addComment(post.id);
                              }
                            }}
                            placeholder={isOdia ? 'ଆପଣଙ୍କ ମତାମତ ବା ପରାମର୍ଶ ଲେଖନ୍ତୁ...' : 'Share a thought, tip or reply...'}
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                          />
                          <button
                            onClick={() => addComment(post.id)}
                            className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm shrink-0"
                          >
                            <Send className="w-3 h-3" />
                            <span>{isOdia ? 'ପଠାନ୍ତୁ' : 'Reply'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INDUSTRY SHOWCASE & MARKETPLACE */}
      {/* ========================================================================= */}
      {activeSubTab === 'marketplace' && (
        <div className="space-y-4">
          {/* Marketplace Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                VERIFIED PET & DAIRY INDUSTRY DIRECTORY
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {isOdia ? 'ପୋଷା ଜୀବ ଖାଦ୍ୟ, ସ୍ୱାସ୍ଥ୍ୟ ଔଷଧ ଓ ଭେଟେରିନାରୀ ସେବା' : 'Certified Nutrition, Wellness & Veterinary Clinics'}
              </h3>
              <p className="text-xs text-slate-600 max-w-xl">
                {isOdia
                  ? 'ପ୍ରତ୍ୟେକ ଉତ୍ପାଦ ପଶୁ ଚିକିତ୍ସକଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚିତ। ସିଧାସଳଖ ଅର୍ଡର କରନ୍ତୁ କିମ୍ବା ଆରୋହୀ ଭେଟମିତ୍ରଙ୍କୁ ଉପଯୁକ୍ତତା ପଚାରନ୍ତୁ।'
                  : 'Every product and service is vetted for safety. Consult Arohi VetMitra for ration balance or dosage before ordering.'}
              </p>
            </div>

            <button
              onClick={() => {
                showToast(isOdia ? 'ବ୍ରାଣ୍ଡ ପଞ୍ଜିକରଣ ସୂଚନା ଖୋଲାଯାଉଛି...' : 'Partner inquiry opened! Contact support@arohiai.com');
              }}
              className="px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 shadow-sm"
            >
              {isOdia ? 'ଆପଣଙ୍କ ବ୍ରାଣ୍ଡ ଯୋଡ଼ନ୍ତୁ' : 'List Your Brand / Clinic'}
            </button>
          </div>

          {/* Marketplace Filter Controls */}
          <div className="space-y-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: isOdia ? 'ସମସ୍ତ ଶ୍ରେଣୀ' : 'All Categories' },
                { id: 'nutrition', label: isOdia ? '🥣 ପୁଷ୍ଟିକର ଖାଦ୍ୟ' : '🥣 Nutrition & Feed' },
                { id: 'wellness', label: isOdia ? '🌿 ସ୍ୱାସ୍ଥ୍ୟ ଓ ଔଷଧ' : '🌿 Wellness & Meds' },
                { id: 'accessories', label: isOdia ? '🦮 ସାମଗ୍ରୀ ଓ ବେଡ୍' : '🦮 Gear & Beds' },
                { id: 'services', label: isOdia ? '🛁 ଡୋରଷ୍ଟେପ୍ ଗ୍ରୁମିଂ' : '🛁 Grooming Van' },
                { id: 'clinic', label: isOdia ? '🏥 ୨୪x୭ କ୍ଲିନିକ୍' : '🏥 24x7 Clinics' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setMarketCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    marketCategory === cat.id
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Species Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'all', label: 'All Species' },
                  { id: 'dog', label: '🐶 Dogs' },
                  { id: 'cat', label: '🐱 Cats' },
                  { id: 'cattle', label: '🐄 Cattle / Dairy' },
                  { id: 'goat', label: '🐐 Goats' },
                ].map(sp => (
                  <button
                    key={sp.id}
                    onClick={() => setMarketSpecies(sp.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      marketSpecies === sp.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={marketSearch}
                  onChange={e => setMarketSearch(e.target.value)}
                  placeholder={isOdia ? 'ଉତ୍ପାଦ ଖୋଜନ୍ତୁ...' : 'Search products, clinics...'}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                        {product.brand}
                      </span>
                      {product.verifiedBadge && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {isOdia && product.nameOdia ? product.nameOdia : product.name}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {isOdia && product.descriptionOdia ? product.descriptionOdia : product.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="pt-1 space-y-1">
                      {product.keyBenefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    {product.deliveryInfo && (
                      <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {product.deliveryInfo}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Ask VetMitra Consultation regarding this product */}
                    <button
                      onClick={() => onAskVetMitra(
                        `I am considering using ${product.name} (${product.brand}) for my ${product.species.join('/')}. What is your clinical opinion on dosage, safety, and suitability?`,
                        product.species[0]
                      )}
                      className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold transition-colors"
                      title="Ask VetMitra about this product"
                    >
                      <Stethoscope className="w-4 h-4 text-emerald-800" />
                    </button>

                    <button
                      onClick={() => setActiveProductModal(product)}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors shrink-0"
                    >
                      <span>{product.bookingAvailable ? 'Book Service' : 'View Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRODUCT DETAIL & ACTION MODAL */}
      {/* ========================================================================= */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="relative h-48 w-full bg-slate-900 shrink-0">
              <img
                src={activeProductModal.imageUrl}
                alt={activeProductModal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveProductModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/80 text-white text-xs font-bold flex items-center gap-2">
                <span>{activeProductModal.brand}</span>
                <span>•</span>
                <span className="text-emerald-400 font-extrabold">{activeProductModal.price}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {isOdia && activeProductModal.nameOdia ? activeProductModal.nameOdia : activeProductModal.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {activeProductModal.rating} ({activeProductModal.reviewsCount} verified reviews)
                  </span>
                  <span>•</span>
                  <span>Species: {activeProductModal.species.join(', ').toUpperCase()}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isOdia && activeProductModal.descriptionOdia ? activeProductModal.descriptionOdia : activeProductModal.description}
              </p>

              {/* Key Highlights */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5">
                <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wide">
                  {isOdia ? 'ମୁଖ୍ୟ ଉପକାରିତା' : 'Key Benefits & Clinical Highlights'}
                </h4>
                {activeProductModal.keyBenefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {activeProductModal.deliveryInfo && (
                <p className="text-xs text-slate-500">
                  🚚 <strong>Dispatch & Coverage:</strong> {activeProductModal.deliveryInfo}
                </p>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  const prod = activeProductModal;
                  setActiveProductModal(null);
                  onAskVetMitra(
                    `I want clinical dosage and suitability advice for ${prod.name} for my animal.`,
                    prod.species[0]
                  );
                }}
                className="px-3.5 py-2.5 rounded-2xl bg-white border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Stethoscope className="w-4 h-4 text-emerald-700" />
                <span>Ask VetMitra Advice</span>
              </button>

              <button
                onClick={() => {
                  showToast(
                    isOdia
                      ? 'ଅର୍ଡର / ବୁକିଂ ଅନୁରୋଧ ଗ୍ରହଣ ହେଲା! ଆପଣଙ୍କୁ ତୁରନ୍ତ ଯୋଗାଯୋଗ କରାଯିବ।'
                      : 'Order / Booking request received! You will receive confirmation on WhatsApp.'
                  );
                  setActiveProductModal(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-transform active:scale-95"
              >
                {activeProductModal.bookingAvailable ? 'Confirm Booking' : 'Order Now (Cash on Delivery)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE POST MODAL COMPOSER */}
      {/* ========================================================================= */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {isOdia ? 'ପୋଷା ଜୀବ ପୋଷ୍ଟ ବା ଡାଏରୀ ସୃଷ୍ଟି କରନ୍ତୁ' : 'Create Pet Community Post / Journal'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isOdia ? 'ସାର୍ବଜନୀନ ଭାବେ ବାଣ୍ଟନ୍ତୁ କିମ୍ବା ବ୍ୟକ୍ତିଗତ ରଖନ୍ତୁ' : 'Share worldwide or save as a private health log'}
                </p>
              </div>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Composer Form */}
            <form onSubmit={handlePublishPost} className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {/* Pet Info & Visibility Selector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {isOdia ? 'ପୋଷା ପଶୁର ନାମ' : 'Pet / Animal Name'}
                  </label>
                  <input
                    type="text"
                    value={petNameInput}
                    onChange={e => setPetNameInput(e.target.value)}
                    placeholder="e.g. Bruno, Simba, Gouri"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    {isOdia ? 'ପ୍ରଜାତି (Species)' : 'Species'}
                  </label>
                  <select
                    value={selectedSpecies}
                    onChange={e => setSelectedSpecies(e.target.value as VetSpecies)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="dog">🐶 Dog (କୁକୁର)</option>
                    <option value="cat">🐱 Cat (ବିରାଡ଼ି)</option>
                    <option value="cattle">🐄 Cattle / Cow (ଗାଈ)</option>
                    <option value="goat">🐐 Goat / Sheep (ଛେଳି)</option>
                  </select>
                </div>
              </div>

              {/* Visibility Setting (The Core User Request) */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isOdia ? 'ଗୋପନୀୟତା ସେଟିଙ୍ଗ୍ (Post Visibility)' : 'Who can see this post?'}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPostVisibility('public')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      postVisibility === 'public'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>🌍 Public</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostVisibility('followers')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      postVisibility === 'followers'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>👥 Followers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostVisibility('private')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      postVisibility === 'private'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>🔒 Private</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  {postVisibility === 'public' && '• Anyone in the worldwide community can discover this post.'}
                  {postVisibility === 'followers' && '• Only verified pet parents who follow you will see this.'}
                  {postVisibility === 'private' && '• Exclusive to your private health journal. No one else can view it.'}
                </p>
              </div>

              {/* Text Area */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  {isOdia ? 'ଆପଣଙ୍କ ବାର୍ତ୍ତା / କାହାଣୀ / ଡାଏରୀ ଲଗ୍' : 'Story / Health Observation / Question'}
                </label>
                <textarea
                  rows={4}
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  placeholder={
                    isOdia
                      ? 'ଆଜି ଆପଣଙ୍କ ପୋଷା ଜୀବର ଦିନ କିପରି ଥିଲା? ଖାଦ୍ୟ, ସ୍ୱାସ୍ଥ୍ୟ ବା ଚିକିତ୍ସା ବିଷୟରେ ଲେଖନ୍ତୁ...'
                      : 'Share your pet milestone, diet transition, recovery update, or ask the community a question...'
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed text-slate-800"
                />
              </div>

              {/* Photo Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 block">
                  {isOdia ? 'ଫଟୋ ଯୋଡ଼ନ୍ତୁ' : 'Attach Photo'}
                </label>
                
                {/* Instant Preset Photos */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    VET_STOCK_IMAGES.dogPlayBeach,
                    VET_STOCK_IMAGES.catSunnyWindow,
                    VET_STOCK_IMAGES.indieRescueDog,
                    VET_STOCK_IMAGES.dairyCattleBarn,
                    VET_STOCK_IMAGES.goatPortrait,
                    VET_STOCK_IMAGES.kittenBasket,
                  ].map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedPhotoUrl(imgUrl);
                        setCustomPhotoInput('');
                      }}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 cursor-pointer shrink-0 transition-transform ${
                        selectedPhotoUrl === imgUrl && !customPhotoInput
                          ? 'border-emerald-600 scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Custom Photo URL input */}
                <input
                  type="text"
                  value={customPhotoInput}
                  onChange={e => setCustomPhotoInput(e.target.value)}
                  placeholder="Or paste any custom image link (optional)"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Tags Input */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  {isOdia ? 'ଟ୍ୟାଗ୍ (Tags, କମା ଦ୍ୱାରା ଅଲଗା କରନ୍ତୁ)' : 'Hashtags (comma-separated)'}
                </label>
                <input
                  type="text"
                  value={postTagInput}
                  onChange={e => setPostTagInput(e.target.value)}
                  placeholder="e.g. IndieLove, PuppyCare, MilkYield, Deworming"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  {isOdia ? 'ବାତିଲ କରନ୍ତୁ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {postVisibility === 'private'
                      ? (isOdia ? 'ଡାଏରୀରେ ସାଇତନ୍ତୁ' : 'Save to Journal')
                      : (isOdia ? 'କମ୍ୟୁନିଟିରେ ପୋଷ୍ଟ କରନ୍ତୁ' : 'Post to Community')}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
