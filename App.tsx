import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { 
  Search, 
  Bell,
  MapPin,
  Image as ImageIcon,
  MoreVertical,
  Check,
  Shield,
  Edit3,
  Save,
  ArrowLeft,
  Briefcase,
  Building2,
  Share2,
  MoreHorizontal,
  Plus,
  Lock,
  Mail,
  Phone,
  LogOut,
  Calendar,
  Sparkles,
  X,
  MessageCircle,
  PhoneCall,
  User as UserIcon,
  Filter,
  GraduationCap,
  Users,
  ChevronDown
} from 'lucide-react';
import PostCard from './components/PostCard';
import EventCard from './components/EventCard';
import ContactModal from './components/ContactModal';
import { Sidebar, BottomNav } from './components/Navigation';
import AuthPage from './pages/AuthPage';
import { MOCK_POSTS, USERS, MOCK_EVENTS } from './constants';
import { PostType, User } from './types';
import { UIContext, useUI, UIProvider } from './context/UIContext';

// --- Internal Components ---

// 1. Toast Notification Component
const ToastContainer = ({ toast, onClose }: { toast: { message: string, type: 'success' | 'error', id: number } | null, onClose: () => void }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[70] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px] justify-center">
        {toast.type === 'success' ? (
          <Check className="w-5 h-5 text-emerald-400" />
        ) : (
          <Shield className="w-5 h-5 text-red-400" />
        )}
        <span className="font-medium text-sm">{toast.message}</span>
      </div>
    </div>
  );
};

// 2. Create Post Modal
const CreatePostModal = () => {
  const { isCreatePostOpen, closeCreatePost, showToast } = useUI();
  const [text, setText] = useState('');

  if (!isCreatePostOpen) return null;

  const handlePost = () => {
    showToast('Post created successfully!', 'success');
    setText('');
    closeCreatePost();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full md:max-w-xl md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-200">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <button onClick={closeCreatePost} className="text-gray-500 hover:text-gray-800">Cancel</button>
          <span className="font-bold text-gray-900">Create Post</span>
          <button 
            onClick={handlePost}
            disabled={!text.trim()}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            Post
          </button>
        </div>
        
        <div className="p-4 flex gap-3">
          <img src={USERS.me.avatar} className="w-10 h-10 rounded-full" alt="Me" />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 resize-none h-32 focus:outline-none text-lg placeholder:text-gray-400"
            autoFocus
          />
        </div>

        <div className="p-4 border-t border-gray-100 flex gap-4">
          <button className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg text-sm font-medium">
            <ImageIcon className="w-4 h-4" /> Photo
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">
            <MapPin className="w-4 h-4" /> Location
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Pages ---

const FeedPage = () => {
  const { openCreatePost } = useUI();
  const [filter, setFilter] = useState<string>('All');

  return (
    <div className="space-y-6 pb-20 md:pb-0 pt-4">
      {/* Create Post Trigger */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-3 items-center mx-4 md:mx-0">
        <img src={USERS.me.avatar} className="w-10 h-10 rounded-full" alt="Me" />
        <button 
          onClick={openCreatePost}
          className="flex-1 text-left bg-gray-100 hover:bg-gray-200 text-gray-500 px-4 py-2.5 rounded-full transition-colors text-sm"
        >
          Share something with the network...
        </button>
        <button className="text-gray-400 hover:text-indigo-600 transition-colors">
          <ImageIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-4 md:px-0 no-scrollbar">
        {['All', 'Medical', 'Events', 'News', 'General'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === type 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {type === 'Medical' && <span className="mr-1.5 text-red-500">●</span>}
            {type}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 md:space-y-6">
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const { showToast } = useUI();

  return (
    <div className="pb-20 md:pb-0 space-y-6 pt-4 px-4 md:px-0">
      {/* Header with Segmented Control & Action */}
      <div className="flex items-center justify-between">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'upcoming' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === 'past' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Past
          </button>
        </div>

        <button 
          onClick={() => showToast('Create Event feature coming soon!', 'success')}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-md shadow-indigo-200 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Event</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="space-y-4 md:space-y-6">
        {MOCK_EVENTS.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
        {MOCK_EVENTS.map(event => (
          <EventCard key={`${event.id}-dup`} event={event} />
        ))}
      </div>
    </div>
  );
};

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { openContactModal } = useUI();
  
  // Filter States
  const [yearFilter, setYearFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');

  const filteredUsers = Object.values(USERS).filter(u => {
    if (u.id === 'me') return false;
    
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = yearFilter === 'All' || u.classYear.includes(yearFilter);
    const matchesClass = classFilter === 'All' || u.classYear.includes(classFilter);
    const matchesIndustry = industryFilter === 'All' || u.industry === industryFilter;

    return matchesSearch && matchesYear && matchesClass && matchesIndustry;
  });

  // Mock Dropdown Options
  const years = ['All', 'K10', 'K12', 'K14', 'K15'];
  const classes = ['All', 'A', 'B', 'C'];
  const industries = ['All', 'Healthcare', 'Technology', 'Software', 'Design', 'Education'];

  const FilterDropdown = ({ 
    icon: Icon, 
    value, 
    onChange, 
    options, 
    label 
  }: { 
    icon: any, 
    value: string, 
    onChange: (val: string) => void, 
    options: string[], 
    label: string 
  }) => (
    <div className="relative min-w-[140px] md:min-w-[160px] flex-shrink-0">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <Icon className="w-4 h-4" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl py-2.5 pl-9 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
      >
        <option value="All">{label}</option>
        {options.filter(o => o !== 'All').map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <div className="pb-20 md:pb-0 pt-4 px-4 md:px-0">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search alumni by name or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm"
        />
      </div>

      {/* Filters Row - Updated for better scrolling */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x">
        <FilterDropdown 
          icon={GraduationCap} 
          label="Cohort (Khóa)" 
          value={yearFilter} 
          onChange={setYearFilter} 
          options={years} 
        />
        <FilterDropdown 
          icon={Users} 
          label="Class (Lớp)" 
          value={classFilter} 
          onChange={setClassFilter} 
          options={classes} 
        />
        <FilterDropdown 
          icon={Briefcase} 
          label="Industry" 
          value={industryFilter} 
          onChange={setIndustryFilter} 
          options={industries} 
        />
      </div>

      {/* Results Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-3">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
                <div className="absolute bottom-0 right-0 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {user.classYear}
                </div>
              </div>
              
              <h3 className="font-bold text-gray-900 truncate w-full mb-1">{user.name}</h3>
              <p className="text-xs text-gray-500 font-medium mb-3">{user.major}</p>
              
              {user.company && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-4 w-full justify-center">
                  <Briefcase className="w-3 h-3 text-gray-400" />
                  <span className="truncate max-w-[100px]">{user.company}</span>
                </div>
              )}

              <button 
                onClick={() => openContactModal(user)}
                className="mt-auto w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Contact
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">No alumni found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search term</p>
          <button 
            onClick={() => { setSearchTerm(''); setYearFilter('All'); setClassFilter('All'); setIndustryFilter('All'); }}
            className="mt-4 text-indigo-600 font-medium text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

const ProfilePage = ({ onLogout }: { onLogout: () => void }) => {
  const [editMode, setEditMode] = useState(false);
  const { showToast } = useUI();
  
  // Settings State
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(true);
  const [notiGeneral, setNotiGeneral] = useState(true);
  const [notiMedical, setNotiMedical] = useState(true);

  // Toggle Handler
  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean, msg: string) => {
    setter(!value);
    showToast(msg, 'success');
  };

  return (
    <div className="pb-24 pt-4 px-4 md:px-0">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <button 
            onClick={() => setEditMode(!editMode)}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white p-2 rounded-full backdrop-blur transition-all"
          >
            {editMode ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </button>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="absolute -top-12 left-6">
            <img src={USERS.me.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-md" alt="Me" />
          </div>
          <div className="mt-14">
            <h1 className="text-2xl font-bold text-gray-900">{USERS.me.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold">{USERS.me.classYear}</span>
              <span>•</span>
              <span>{USERS.me.major}</span>
            </div>
            <p className="mt-3 text-gray-600 leading-relaxed text-sm">
              {USERS.me.bio || "Passionate about connecting people and building communities. Currently working on interesting projects."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{USERS.me.company}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Hanoi, Vietnam</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900">Privacy Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">Show Email</p>
                <p className="text-xs text-gray-500">Visible in directory</p>
              </div>
              <button 
                onClick={() => handleToggle(setShowEmail, showEmail, `Email visibility ${!showEmail ? 'enabled' : 'disabled'}`)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${showEmail ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ${showEmail ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">Show Phone Number</p>
                <p className="text-xs text-gray-500">Allow calls from alumni</p>
              </div>
              <button 
                onClick={() => handleToggle(setShowPhone, showPhone, `Phone visibility ${!showPhone ? 'enabled' : 'disabled'}`)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${showPhone ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ${showPhone ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-6">
             <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">General Updates</p>
                <p className="text-xs text-gray-500">News and announcements</p>
              </div>
              <button 
                onClick={() => handleToggle(setNotiGeneral, notiGeneral, `General notifications ${!notiGeneral ? 'enabled' : 'disabled'}`)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${notiGeneral ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ${notiGeneral ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">Medical Support</p>
                <p className="text-xs text-gray-500">Urgent help requests</p>
              </div>
              <button 
                onClick={() => handleToggle(setNotiMedical, notiMedical, `Medical alerts ${!notiMedical ? 'enabled' : 'disabled'}`)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${notiMedical ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-200 ${notiMedical ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onLogout} className="w-full mt-8 bg-red-50 text-red-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
        <LogOut className="w-5 h-5" /> Sign Out
      </button>
    </div>
  );
};

const PostDetailPage = () => {
  const { id } = useParams();
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) return <div className="p-8 text-center text-gray-500">Post not found</div>;

  return (
    <div className="pb-20 md:pb-0 pt-0 md:pt-4 max-w-2xl mx-auto">
      <PostCard post={post} isDetailView={true} />
    </div>
  );
};

const EventDetailPage = () => {
  const { id } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === id);
  const navigate = useNavigate();

  if (!event) return <div className="p-8 text-center text-gray-500">Event not found</div>;

  return (
    <div className="pb-24 md:pb-0 bg-white min-h-screen md:min-h-0 md:rounded-2xl md:shadow-sm md:border md:border-gray-200 overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 w-full">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
          <span className="inline-block px-2 py-1 bg-indigo-600 rounded text-xs font-bold mb-2 uppercase tracking-wide">
            Upcoming Event
          </span>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">{event.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-200 font-medium">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <img src={event.organizer.avatar} className="w-12 h-12 rounded-full border border-gray-200" alt="" />
          <div>
            <p className="text-sm text-gray-500">Organized by</p>
            <p className="font-bold text-gray-900">{event.organizer.name}</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-3 text-lg">About this event</h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">
          {event.description}
        </p>

        <h3 className="font-bold text-gray-900 mb-4 text-lg">Attendees ({event.attendees.length})</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {event.attendees.map(user => (
            <div key={user.id} className="flex flex-col items-center gap-1 min-w-[60px]">
              <img src={user.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt={user.name} />
              <span className="text-[10px] text-gray-600 text-center truncate w-full">{user.name.split(' ').pop()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-none flex items-center gap-3 z-50">
        <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
          Maybe
        </button>
        <button className="flex-[2] py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
          Join Event
        </button>
      </div>
    </div>
  );
};

// --- Layout & Main App ---

const DetailHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-14 flex items-center gap-3">
      <button 
        onClick={() => navigate(-1)} 
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="font-bold text-lg text-gray-900 truncate flex-1">{title}</h1>
      <button className="p-2 text-gray-500 hover:text-gray-900">
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const MainHeader = () => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-16 flex items-center justify-between md:hidden">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Alumni
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </div>
  );
};

const Layout = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/post/') || location.pathname.startsWith('/event/');
  
  // Dynamic Title Logic
  const getPageTitle = () => {
    if (location.pathname.startsWith('/post/')) return 'Post Details';
    if (location.pathname.startsWith('/event/')) return 'Event Details';
    return 'Back';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar onLogout={onLogout} />
      
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
        {/* Mobile Header Logic */}
        <div className="md:hidden">
          {isDetailPage ? <DetailHeader title={getPageTitle()} /> : <MainHeader />}
        </div>

        {/* Desktop Header (Search) */}
        <div className="hidden md:flex h-16 border-b border-gray-200 bg-white items-center justify-between px-8 sticky top-0 z-30">
           <h2 className="text-xl font-bold text-gray-800 capitalize">
             {location.pathname === '/' ? 'Home Feed' : location.pathname.split('/')[1] || 'Feed'}
           </h2>
           <div className="flex items-center gap-4">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 transition-all"
               />
             </div>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full max-w-3xl mx-auto md:p-6">
          <Outlet />
        </div>
        
        <BottomNav />
      </main>

      <CreatePostModal />
      <ContactModal />
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error', id: number } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  return (
    <UIProvider showToast={showToast}>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<AuthPage onLogin={() => setIsAuthenticated(true)} />} />
          ) : (
            <Route element={<Layout onLogout={() => setIsAuthenticated(false)} />}>
              <Route path="/" element={<FeedPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/profile" element={<ProfilePage onLogout={() => setIsAuthenticated(false)} />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/event/:id" element={<EventDetailPage />} />
            </Route>
          )}
        </Routes>
        <ToastContainer toast={toast} onClose={() => setToast(null)} />
      </Router>
    </UIProvider>
  );
};

export default App;