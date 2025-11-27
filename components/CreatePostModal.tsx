import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, MapPin, AlertCircle, GripHorizontal, Trash2, FileText, HeartPulse, Calendar, Newspaper } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { USERS } from '../constants';
import { PostType } from '../types';

const CreatePostModal = () => {
  const { isCreatePostOpen, closeCreatePost } = useUI();
  const [text, setText] = useState('');
  const [postType, setPostType] = useState<PostType | 'GENERAL'>('GENERAL');
  const [isUrgent, setIsUrgent] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [draggedImgIndex, setDraggedImgIndex] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCreatePostOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10)); // Limit to 10
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Simple Drag and Drop Reordering
  const handleDragStart = (index: number) => {
    setDraggedImgIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedImgIndex === null || draggedImgIndex === index) return;
    const newImages = [...images];
    const draggedImage = newImages[draggedImgIndex];
    newImages.splice(draggedImgIndex, 1);
    newImages.splice(index, 0, draggedImage);
    setImages(newImages);
    setDraggedImgIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedImgIndex(null);
  };

  const POST_TYPES = [
    { 
      type: 'GENERAL', 
      label: 'General', 
      icon: FileText,
      desc: 'Share updates & thoughts',
      activeClass: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      iconClass: 'bg-indigo-100 text-indigo-600'
    },
    { 
      type: PostType.MEDICAL, 
      label: 'Medical', 
      icon: HeartPulse,
      desc: 'Seek professional help',
      activeClass: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      iconClass: 'bg-emerald-100 text-emerald-600'
    },
    { 
      type: PostType.EVENT, 
      label: 'Event', 
      icon: Calendar,
      desc: 'Organize a meetup',
      activeClass: 'bg-orange-50 border-orange-200 text-orange-700',
      iconClass: 'bg-orange-100 text-orange-600'
    },
    { 
      type: PostType.NEWS, 
      label: 'News', 
      icon: Newspaper,
      desc: 'Alumni announcements',
      activeClass: 'bg-blue-50 border-blue-200 text-blue-700',
      iconClass: 'bg-blue-100 text-blue-600'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
          <h3 className="font-bold text-lg text-gray-900">Create New Post</h3>
          <button onClick={closeCreatePost} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-6">
              <img src={USERS.me.avatar} alt="Me" className="w-12 h-12 rounded-full object-cover border border-gray-100" />
              <div>
                <p className="font-bold text-gray-900">{USERS.me.name}</p>
                <p className="text-xs text-gray-500 font-medium">{USERS.me.classYear} · {USERS.me.major}</p>
              </div>
            </div>

            {/* Post Type Selector - Cards */}
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Select Post Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {POST_TYPES.map((t) => {
                const isActive = postType === t.type;
                const Icon = t.icon;
                return (
                  <button
                    key={t.type}
                    onClick={() => setPostType(t.type as any)}
                    className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-200 ${
                      isActive 
                        ? `${t.activeClass} shadow-sm ring-1 ring-inset ring-current` 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full mb-2 ${isActive ? 'bg-white/50' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold leading-tight">{t.label}</span>
                    <span className="text-[10px] opacity-80 mt-1 leading-tight">{t.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Medical Urgent Toggle - Modern Slick */}
            {postType === PostType.MEDICAL && (
              <div className={`mb-6 rounded-xl p-4 border transition-all duration-300 flex items-center justify-between ${
                isUrgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-500'}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isUrgent ? 'text-red-700' : 'text-gray-700'}`}>Urgent Request</p>
                    <p className={`text-xs ${isUrgent ? 'text-red-600/80' : 'text-gray-500'}`}>Mark this post as high priority</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-12 h-7 rounded-full transition-colors relative focus:outline-none ${isUrgent ? 'bg-red-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isUrgent ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            )}
            
            {/* Text Area */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind, ${USERS.me.name.split(' ')[0]}?`}
              className="w-full min-h-[150px] resize-none text-gray-800 placeholder:text-gray-400 focus:outline-none text-lg leading-relaxed bg-transparent"
              autoFocus
            />

            {/* Image Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative aspect-square group rounded-xl overflow-hidden border border-gray-200 shadow-sm ${draggedImgIndex === index ? 'opacity-50 scale-95' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <GripHorizontal className="text-white/90 w-6 h-6 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform" />
                      <button onClick={() => removeImage(index)} className="text-white/90 hover:text-red-400 hover:scale-110 transition-transform">
                         <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold backdrop-blur-md">
                      {index + 1}
                    </div>
                  </div>
                ))}
                {images.length < 10 && (
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all group"
                   >
                      <ImageIcon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold">Add Photo</span>
                   </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex gap-1">
            <input 
               type="file" 
               multiple 
               accept="image/*" 
               className="hidden" 
               ref={fileInputRef}
               onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-gray-500 hover:bg-white hover:shadow-sm hover:text-indigo-600 rounded-xl transition-all"
              title="Add Photos"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            <button className="p-2.5 text-gray-500 hover:bg-white hover:shadow-sm hover:text-indigo-600 rounded-xl transition-all">
              <MapPin className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={closeCreatePost}
            className="px-8 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
            disabled={!text && images.length === 0}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;