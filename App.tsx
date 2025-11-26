
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bell, MoreVertical, X, ImageIcon, MapPin, Phone, Mail } from 'lucide-react';
import { UIProvider, useUI } from './context/UIContext';
import { Sidebar, BottomNav } from './components/Navigation';
import { USERS, MOCK_POSTS } from './constants';
import PostCard from './components/PostCard';

// Pages
import { AuthPage } from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import EventsPage from './pages/EventsPage';
import DirectoryPage from './pages/DirectoryPage';
import ProfilePage from './pages/ProfilePage';
import EventDetailPage from './pages/EventDetailPage';

// --- Modals (Keep simple ones here or extract further) ---

const CreatePostModal = () => {
  const { isCreatePostOpen, closeCreatePost } = useUI();
  const [text, setText] = useState('');

  if (!isCreatePostOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-lg text-gray-900">Create Post</h3>
          <button onClick={closeCreatePost} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex gap-3 mb-4">
            <img src={USERS.me.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{USERS.me.name}</p>
              <button className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 mt-0.5">
                General <MoreVertical className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to share with the alumni network?"
            className="w-full h-32 resize-none text-gray-800 placeholder:text-gray-400 focus:outline-none text-base leading-relaxed"
            autoFocus
          />
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-indigo-600 transition-colors"><ImageIcon className="w-6 h-6" /></button>
            <button className="text-gray-500 hover:text-indigo-600 transition-colors"><MapPin className="w-6 h-6" /></button>
          </div>
          <button 
            onClick={closeCreatePost}
            className="px-6 py-2 rounded-full font-semibold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactModal = () => {
  const { contactUser, closeContactModal } = useUI();
  if (!contactUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="relative h-24 bg-gradient-to-r from-indigo-500 to-purple-600">
          <button 
            onClick={closeContactModal}
            className="absolute top-3 right-3 bg-black/20 text-white p-1 rounded-full hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <img src={contactUser.avatar} alt={contactUser.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
          </div>
        </div>
        
        <div className="pt-12 pb-6 px-6 text-center">
          <h3 className="text-xl font-bold text-gray-900">{contactUser.name}</h3>
          <p className="text-gray-500 text-sm mb-6">{contactUser.company} · {contactUser.industry}</p>
          
          <div className="space-y-3">
            <a href={`tel:+84999999999`} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-semibold uppercase">Mobile</p>
                <p className="text-gray-900 font-medium group-hover:text-indigo-700">0999 999 999</p>
              </div>
            </a>

            <a href={`mailto:contact@alumni.com`} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all group">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                <p className="text-gray-900 font-medium group-hover:text-pink-700">contact@{contactUser.id}.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Layout ---

const Layout = () => {
  const location = useLocation();
  const getTitle = () => {
    if (location.pathname === '/') return 'Feed';
    if (location.pathname === '/events') return 'Events';
    if (location.pathname === '/directory') return 'Directory';
    if (location.pathname === '/profile') return 'Profile';
    return 'Alumni';
  };
  
  // Custom Header
  const Header = () => {
    const isDetail = location.pathname.startsWith('/post/') || location.pathname.startsWith('/event/');
    const navigate = useNavigate();

    if (isDetail) return (
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-20 px-4 h-16 flex items-center gap-2">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full flex-shrink-0"><ArrowLeft className="w-6 h-6 text-gray-700"/></button>
         <h2 className="text-lg font-bold text-gray-900 truncate flex-1">{getTitle()}</h2>
         <button className="p-2 hover:bg-gray-100 rounded-full"><Share2 className="w-5 h-5 text-gray-500"/></button>
      </header>
    );

    return (
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10 px-4 h-16 flex items-center justify-between">
         <div className="md:hidden font-bold text-lg text-indigo-600">Alumni</div>
         <div className="hidden md:block font-bold text-xl text-gray-800">{getTitle()}</div>
         <button className="p-2 hover:bg-gray-100 rounded-full relative"><Bell className="w-6 h-6 text-gray-500"/><span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span></button>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16 md:pb-0 md:pl-64">
      <Sidebar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<PostCard isDetailView post={MOCK_POSTS[0]} />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </main>
      <BottomNav />
      <CreatePostModal />
      <ContactModal />
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) return <AuthPage onLogin={() => setIsAuthenticated(true)} />;

  return (
    <Router>
      <UIProvider>
        <Layout />
      </UIProvider>
    </Router>
  );
};

export default App;
