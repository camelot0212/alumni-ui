
import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import { MOCK_POSTS, USERS } from '../constants';
import { PostType } from '../types';
import { useUI } from '../context/UIContext';

const FeedPage = () => {
  const { openCreatePost } = useUI();
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');

  const FilterChip = ({ type, label }: { type: PostType | 'ALL', label: string }) => (
    <button 
      onClick={() => setFilter(type)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        filter === type ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-gray-600 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 pb-24 md:pb-8">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-4 px-4 md:mx-0 md:px-0">
        <FilterChip type="ALL" label="All Posts" />
        <FilterChip type={PostType.MEDICAL} label="#Medical" />
        <FilterChip type={PostType.EVENT} label="#Events" />
        <FilterChip type={PostType.GENERAL} label="#General" />
      </div>

      <div onClick={openCreatePost} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6 flex gap-4 cursor-pointer hover:border-indigo-300 transition-colors group">
        <img src={USERS.me.avatar} className="w-12 h-12 rounded-full border border-gray-100" alt="Me" />
        <div className="flex-1 bg-gray-50 rounded-xl p-3 text-gray-500 text-sm group-hover:bg-gray-100">
          Share something with the alumni network...
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_POSTS.filter(p => filter === 'ALL' || p.type === filter).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
