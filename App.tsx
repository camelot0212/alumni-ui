import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Users, 
  UserCircle, 
  Search, 
  PlusSquare, 
  Bell,
  LogOut,
  MapPin,
  Mail,
  Phone,
  X,
  Image as ImageIcon,
  MoreVertical,
  UserPlus,
  Check,
  Settings,
  Shield,
  Edit3,
  Save,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Briefcase,
  GraduationCap,
  Building2,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import PostCard from './components/PostCard';
import { MOCK_POSTS, USERS, MOCK_EVENTS } from './constants';
import { PostType, User } from './types';

// --- Context for UI Actions (Modals, etc.) ---
interface UIContextType {
  isCreatePostOpen: boolean;
  openCreatePost: () => void;
  closeCreatePost: () => void;
}

const UIContext = createContext<UIContextType>({
  isCreatePostOpen: false,
  openCreatePost: () => {},
  closeCreatePost: () => {},
});

const useUI = () => useContext(UIContext);

// --- Components ---

// 1. Create Post Modal
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
          
          <div className="mt-4 flex gap-2 overflow-x-auto py-2 no-scrollbar">
             {/* Mock Image Previews */}
             <div className="w-20 h-20 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-100 transition-colors">
               <ImageIcon className="w-6 h-6 text-gray-400" />
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-indigo-600 transition-colors">
              <ImageIcon className="w-6 h-6" />
            </button>
            <button className="text-gray-500 hover:text-indigo-600 transition-colors">
              <MapPin className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={closeCreatePost}
            disabled={!text.trim()}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
              text.trim() 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Navigation Sidebar (Desktop)
const Sidebar = () => {
  const { openCreatePost } = useUI();
  
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Alumni
        </h1>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        <NavLink to="/" className={linkClass}>
          <Home className="w-5 h-5" /> Feed
        </NavLink>
        <NavLink to="/events" className={linkClass}>
          <Calendar className="w-5 h-5" /> Events
        </NavLink>
        <NavLink to="/directory" className={linkClass}>
          <Users className="w-5 h-5" /> Directory
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          <UserCircle className="w-5 h-5" /> Profile
        </NavLink>

        <button 
          onClick={openCreatePost}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition-colors"
        >
          <PlusSquare className="w-5 h-5" /> Create Post
        </button>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <NavLink to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <img src={USERS.me.avatar} alt="Me" className="w-9 h-9 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{USERS.me.name}</p>
            <p className="text-xs text-gray-500 truncate">{USERS.me.classYear} · {USERS.me.major}</p>
          </div>
          <LogOut className="w-4 h-4 text-gray-400" />
        </NavLink>
      </div>
    </div>
  );
};

// 3. Mobile Bottom Navigation
const BottomNav = () => {
  const { openCreatePost } = useUI();
  
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center p-2 w-full transition-colors ${
      isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 pb-safe">
      <NavLink to="/" className={linkClass}>
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">Feed</span>
      </NavLink>
      <NavLink to="/events" className={linkClass}>
        <Calendar className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">Events</span>
      </NavLink>
      <div className="flex items-center justify-center -mt-8 relative z-10">
        <button 
          onClick={openCreatePost}
          className="bg-indigo-600 text-white p-3.5 rounded-full shadow-lg shadow-indigo-200 hover:scale-105 transition-transform active:scale-95"
        >
          <PlusSquare className="w-7 h-7" />
        </button>
      </div>
      <NavLink to="/directory" className={linkClass}>
        <Users className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">People</span>
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <UserCircle className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">You</span>
      </NavLink>
    </div>
  );
};

// 4. Headers

// Standard Header with Search (for main pages)
const MainHeader = ({ title }: { title: string }) => (
  <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10 px-4 h-16 flex items-center justify-between">
    <div className="md:hidden">
      <span className="font-bold text-lg text-indigo-600">Alumni</span>
    </div>
    
    <div className="hidden md:block">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>

    <div className="flex items-center gap-3">
      <div className="relative hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
      </div>
      <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <button className="md:hidden p-2 text-gray-500">
        <Search className="w-6 h-6" />
      </button>
    </div>
  </header>
);

// Detail Header with Back Button (for post/event details)
const DetailHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-20 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3 overflow-hidden">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-900 truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

// --- Pages ---

// Page: Feed
const FeedPage = () => {
  const { openCreatePost } = useUI();
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');

  const filteredPosts = filter === 'ALL' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.type === filter);

  const FilterChip = ({ type, label }: { type: PostType | 'ALL', label: string }) => (
    <button 
      onClick={() => setFilter(type)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        filter === type 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 pb-24 md:pb-8">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <FilterChip type="ALL" label="All Posts" />
        <FilterChip type={PostType.MEDICAL} label="#Medical" />
        <FilterChip type={PostType.EVENT} label="#Events" />
        <FilterChip type={PostType.GENERAL} label="#General" />
      </div>

      <div 
        onClick={openCreatePost}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6 flex gap-4 cursor-pointer hover:border-indigo-300 transition-colors group"
      >
        <img src={USERS.me.avatar} className="w-12 h-12 rounded-full border border-gray-100" alt="Me" />
        <div className="flex-1">
          <div className="w-full bg-gray-50 rounded-xl p-3 text-gray-500 text-sm group-hover:bg-gray-100 transition-colors">
            Share something with the alumni network...
          </div>
          <div className="flex gap-4 mt-3 pl-1">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">
              <ImageIcon className="w-4 h-4" /> Photo
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">
               <Calendar className="w-4 h-4" /> Event
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

// Page: Post Detail
const PostDetailPage = () => {
  const { id } = useParams();
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) return <div className="p-4 text-center text-gray-500">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 pb-24 md:pb-8">
      <PostCard post={post} isDetailView={true} />
    </div>
  );
};

// Page: Events
const EventsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
          View Past
        </button>
      </div>

      <div className="grid gap-6">
        {MOCK_EVENTS.map(event => (
          <div 
            key={event.id} 
            onClick={() => navigate(`/event/${event.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="h-48 md:w-2/5 md:h-auto relative overflow-hidden">
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-center shadow-sm z-10">
                 <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                   {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                 </div>
                 <div className="text-xl font-bold text-gray-900 leading-none">
                   {new Date(event.date).getDate()}
                 </div>
               </div>
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                     <Calendar className="w-4 h-4 text-indigo-500" />
                     {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                     <MapPin className="w-4 h-4 text-indigo-500" />
                     {event.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                 <div className="flex -space-x-2">
                   {event.attendees.map(u => (
                     <img key={u.id} src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100" title={u.name} />
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-500 ring-1 ring-gray-100">
                     +12
                   </div>
                 </div>

                 <div className="flex gap-2.5">
                   <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                     Maybe
                   </button>
                   <button className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                     View
                   </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Page: Event Detail
const EventDetailPage = () => {
  const { id } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === id);

  if (!event) return <div className="p-4 text-center text-gray-500">Event not found</div>;

  return (
    <div className="max-w-4xl mx-auto pb-24 md:pb-8 bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-200 md:mt-6 overflow-hidden min-h-[calc(100vh-80px)] md:min-h-0 relative">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 w-full">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
               <span className="inline-block px-2 py-1 rounded bg-indigo-600 text-xs font-bold mb-2 uppercase tracking-wide">
                 Event
               </span>
               <h1 className="text-2xl md:text-4xl font-bold mb-2">{event.title}</h1>
               <div className="flex flex-wrap gap-4 text-sm md:text-base font-medium text-gray-200">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {event.location}
                  </span>
               </div>
            </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
           {/* Left Column */}
           <div className="md:col-span-2 space-y-8">
              {/* Organizer */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <img src={event.organizer.avatar} alt={event.organizer.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Organized by</p>
                  <p className="text-gray-900 font-bold">{event.organizer.name}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">About this event</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
           </div>

           {/* Right Column */}
           <div className="space-y-6">
              {/* Attendees */}
              <div className="bg-white md:bg-gray-50 rounded-xl md:border md:border-gray-100 md:p-5">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-gray-900">Attendees</h3>
                   <span className="text-sm text-indigo-600 font-medium">See all</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {event.attendees.map(u => (
                    <img key={u.id} src={u.avatar} className="w-10 h-10 rounded-full border border-gray-200" title={u.name} />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    +12
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center text-gray-400 border border-gray-200">
                <div className="text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span className="text-sm font-medium">Map View</span>
                </div>
              </div>
           </div>
        </div>

        {/* Floating Footer for Mobile / Inline for Desktop */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:relative md:border-none md:bg-transparent md:p-0 md:px-6 md:pb-6">
           <div className="flex gap-3 max-w-4xl mx-auto">
             <button className="flex-1 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
               Maybe
             </button>
             <button className="flex-[2] py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">
               Join Event
             </button>
           </div>
        </div>
    </div>
  );
};

// Page: Directory (Compact & Professional)
const DirectoryPage = () => {
  const users = Object.values(USERS).filter(u => u.id !== 'me');

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 pb-24 md:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4 hover:border-indigo-300 transition-colors group shadow-sm hover:shadow-md">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">
                      {user.classYear}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                       {user.major}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-indigo-600 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                   <Building2 className="w-3.5 h-3.5 text-gray-400" />
                   <span className="truncate">{user.company || 'Open to work'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                   <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                   <span className="truncate">{user.industry}</span>
                </div>
              </div>
              
              <button className="mt-4 w-full py-1.5 text-xs font-bold text-indigo-600 border border-indigo-100 bg-indigo-50/50 rounded-lg hover:bg-indigo-100 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Page: Profile (Redesigned with Settings)
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Privacy State
  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showPhone: false
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    chat: true,
    jobs: true,
    medical: true,
    general: false
  });

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange} 
      className={`transition-colors ${checked ? 'text-indigo-600' : 'text-gray-300'}`}
    >
      {checked ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-8">
       {/* Header */}
       <div className="bg-white p-6 md:rounded-2xl md:mt-6 md:border md:border-gray-200 md:shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
             <div className="relative">
               <img src={USERS.me.avatar} alt="Me" className="w-28 h-28 rounded-full border-4 border-white shadow-md" />
               <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-1.5 rounded-full hover:bg-gray-700 border-2 border-white">
                 <Edit3 className="w-4 h-4" />
               </button>
             </div>
             
             <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{USERS.me.name}</h1>
                    <p className="text-gray-500 font-medium">{USERS.me.classYear} · {USERS.me.major}</p>
                    <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto md:mx-0">
                      {USERS.me.bio || "Digital product designer passionate about building accessible and inclusive user experiences."}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 mx-auto md:mx-0 transition-colors ${
                      isEditing 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Settings className="w-4 h-4" /> Edit Profile</>}
                  </button>
                </div>
             </div>
          </div>
       </div>

       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
               <UserCircle className="w-5 h-5 text-indigo-600" />
               <h3 className="font-bold text-gray-900">Personal Information</h3>
            </div>
            <div className="p-6 space-y-5">
               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                 {isEditing ? (
                   <input type="text" defaultValue={USERS.me.name} className="w-full border-b border-gray-300 py-1 focus:border-indigo-600 focus:outline-none text-gray-900 font-medium" />
                 ) : (
                   <p className="text-gray-900 font-medium">{USERS.me.name}</p>
                 )}
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-400 uppercase">Class</label>
                   <p className="text-gray-900 font-medium flex items-center gap-2">
                     <GraduationCap className="w-4 h-4 text-gray-400" /> {USERS.me.classYear}
                   </p>
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-gray-400 uppercase">Major</label>
                   <p className="text-gray-900 font-medium">{USERS.me.major}</p>
                 </div>
               </div>
               
               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase">Current Work</label>
                 <p className="text-gray-900 font-medium flex items-center gap-2">
                   <Building2 className="w-4 h-4 text-gray-400" /> {USERS.me.company}
                 </p>
                 <p className="text-gray-500 text-sm flex items-center gap-2">
                   <Briefcase className="w-4 h-4 text-gray-400" /> {USERS.me.industry}
                 </p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Privacy Settings */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                 <Shield className="w-5 h-5 text-emerald-600" />
                 <h3 className="font-bold text-gray-900">Privacy Settings</h3>
              </div>
              <div className="p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Show Email</p>
                      <p className="text-xs text-gray-500">Allow others to see your email</p>
                    </div>
                    <ToggleSwitch checked={privacy.showEmail} onChange={() => togglePrivacy('showEmail')} />
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Show Phone</p>
                      <p className="text-xs text-gray-500">Allow others to see your number</p>
                    </div>
                    <ToggleSwitch checked={privacy.showPhone} onChange={() => togglePrivacy('showPhone')} />
                 </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                 <Bell className="w-5 h-5 text-orange-500" />
                 <h3 className="font-bold text-gray-900">Notification Preferences</h3>
              </div>
              <div className="p-6 space-y-4">
                 {[
                   { key: 'medical', label: 'Medical Support', sub: 'Urgent requests & help' },
                   { key: 'jobs', label: 'Jobs & Opportunities', sub: 'New openings in your industry' },
                   { key: 'chat', label: 'Chat Messages', sub: 'Direct messages from others' },
                   { key: 'general', label: 'General News', sub: 'Updates from the network' }
                 ].map((item) => (
                   <div key={item.key} className="flex items-start gap-3">
                      <div 
                        onClick={() => toggleNotification(item.key as any)}
                        className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                          notifications[item.key as keyof typeof notifications] 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : 'border-gray-300 bg-white'
                        }`}
                      >
                        {notifications[item.key as keyof typeof notifications] && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none mb-1">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
       </div>

       <div className="mt-8 px-4 md:px-0 text-center">
         <button className="text-red-600 font-semibold text-sm flex items-center justify-center gap-2 mx-auto hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
           <LogOut className="w-4 h-4" /> Sign Out
         </button>
         <p className="text-xs text-gray-400 mt-2">Alumni Network v2.1.0</p>
       </div>
    </div>
  );
};

// Layout
const Layout = () => {
  const location = useLocation();
  
  // Dynamic Header Title based on Route
  const getTitle = () => {
    if (location.pathname === '/') return 'Feed';
    if (location.pathname === '/events') return 'Events';
    if (location.pathname === '/directory') return 'Directory';
    if (location.pathname === '/profile') return 'Your Profile';
    if (location.pathname.startsWith('/post/')) return 'Post Details';
    if (location.pathname.startsWith('/event/')) return 'Event Details';
    return 'Alumni';
  };

  // Determine if we are in a Detail View
  const isDetailView = location.pathname.startsWith('/post/') || location.pathname.startsWith('/event/');

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16 md:pb-0 md:pl-64">
      <Sidebar />
      {/* Switch between MainHeader and DetailHeader */}
      {isDetailView ? (
        <DetailHeader title={getTitle()} />
      ) : (
        <MainHeader title={getTitle()} />
      )}
      <main>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
        </Routes>
      </main>
      <BottomNav />
      <CreatePostModal />
    </div>
  );
};

const App = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <Router>
      <UIContext.Provider value={{
        isCreatePostOpen,
        openCreatePost: () => setIsCreatePostOpen(true),
        closeCreatePost: () => setIsCreatePostOpen(false)
      }}>
        <Layout />
      </UIContext.Provider>
    </Router>
  );
};

export default App;