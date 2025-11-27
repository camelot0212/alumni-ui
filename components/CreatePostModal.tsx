
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
      desc: 'Share updates',
      // Monochrome Active State
      activeClass: 'bg-gray-900 text-white shadow-md border-gray-900',
      iconClass: ''
    },
    { 
      type: PostType.MEDICAL, 
      label: 'Medical', 
      icon: HeartPulse,
      desc: 'Seek help',
      activeClass: 'bg-gray-900 text-white shadow-md border-gray-900',
      iconClass: ''
    },
    { 
      type: PostType.EVENT, 
      label: 'Event', 
      icon: Calendar,
      desc: 'Meetup',
      activeClass: 'bg-gray-900 text-white shadow-md border-gray-900',
      iconClass: ''
    },
    { 
      type: PostType.NEWS, 
      label: 'News', 
      icon: Newspaper,
      desc: 'Announce',
      activeClass: 'bg-gray-900 text-white shadow-md border-gray-900',
      iconClass: ''
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Fixed Height Container - Prevents layout jumping */}
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl flex flex-col h-[85vh] m-4 animate-in zoom-in-95 duration-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10 shrink-0">
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

            {/* Post Type Selector - Horizontal Scroll - Monochrome */}
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Select Post Type</label>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar mb-4">
              {POST_TYPES.map((t) => {
                const isActive = postType === t.type;
                const Icon = t.icon;
                return (
                  <button
                    key={t.type}
                    onClick={() => setPostType(t.type as any)}
                    className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-200 w-24 ${
                      isActive 
                        ? t.activeClass 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-full mb-1 ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold leading-tight">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Medical Urgent Toggle - Refined */}
            {postType === PostType.MEDICAL && (
              <div className={`mb-6 rounded-xl p-4 border transition-all duration-300 flex items-center justify-between ${
                isUrgent ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isUrgent ? 'text-red-700' : 'text-gray-900'}`}>Urgent Request</p>
                    <p className="text-xs text-gray-500">Mark as high priority</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${isUrgent ? 'bg-red-500' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isUrgent ? 'translate-x-5.5 left-0.5' : 'left-0.5 translate-x-0'}`} />
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
                     className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all group"
                   >
                      <ImageIcon className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold">Add</span>
                   </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
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
            className="px-8 py-2.5 rounded-xl font-bold text-sm bg-gray-900 text-white shadow-lg shadow-gray-200 hover:bg-black hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
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
