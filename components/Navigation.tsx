
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, UserCircle, PlusSquare, BookOpen } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { USERS } from '../constants';

export const Sidebar = () => {
  const { openCreatePost } = useUI();
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Alumni</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        <NavLink to="/" className={linkClass}><Home className="w-5 h-5" /> Feed</NavLink>
        <NavLink to="/events" className={linkClass}><Calendar className="w-5 h-5" /> Events</NavLink>
        <NavLink to="/directory" className={linkClass}><Users className="w-5 h-5" /> Directory</NavLink>
        <NavLink to="/history" className={linkClass}><BookOpen className="w-5 h-5" /> History</NavLink>
        <NavLink to="/profile" className={linkClass}><UserCircle className="w-5 h-5" /> Profile</NavLink>
        <button onClick={openCreatePost} className="w-full mt-6 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition-colors">
          <PlusSquare className="w-5 h-5" /> Create Post
        </button>
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <img src={USERS.me.avatar} alt="Me" className="w-9 h-9 rounded-full" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{USERS.me.name}</p>
            <p className="text-xs text-gray-500 truncate">{USERS.me.classYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BottomNav = () => {
  const { openCreatePost } = useUI();
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center p-2 w-full transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 pb-safe">
      <NavLink to="/" className={linkClass}><Home className="w-6 h-6" /><span className="text-[10px] font-medium mt-1">Feed</span></NavLink>
      <NavLink to="/events" className={linkClass}><Calendar className="w-6 h-6" /><span className="text-[10px] font-medium mt-1">Events</span></NavLink>
      <div className="flex items-center justify-center -mt-8 relative z-10">
        <button onClick={openCreatePost} className="bg-indigo-600 text-white p-3.5 rounded-full shadow-lg shadow-indigo-200 hover:scale-105 transition-transform active:scale-95">
          <PlusSquare className="w-7 h-7" />
        </button>
      </div>
      <NavLink to="/directory" className={linkClass}><Users className="w-6 h-6" /><span className="text-[10px] font-medium mt-1">People</span></NavLink>
      <NavLink to="/history" className={linkClass}><BookOpen className="w-6 h-6" /><span className="text-[10px] font-medium mt-1">History</span></NavLink>
    </div>
  );
};
