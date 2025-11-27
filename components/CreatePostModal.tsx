
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
      desc: 'Updates',
    },
    { 
      type: PostType.MEDICAL, 
      label: 'Medical', 
      icon: HeartPulse,
      desc: 'Support',
    },
    { 
      type: PostType.EVENT, 
      label: 'Event', 
      icon: Calendar,
      desc: 'Meetup',
    },
    { 
      type: PostType.NEWS, 
      label: 'News', 
      icon: Newspaper,
      desc: 'Announce',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Container: Fixed Height h-[85vh] to prevent jitter, rounded corners */}
      <div className="bg-white w-full max-w-xl h-[85vh] rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white z-10 flex-shrink-0">
          <h3 className="font-bold text-lg text-gray-900">Create Post</h3>
          <button onClick={closeCreatePost} className="text-gray-400 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-5">
            {/* User Info with Badge */}
            <div className="flex items-center gap-3 mb-6">
              <img src={USERS.me.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 text-sm">{USERS.me.name}</p>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                    {USERS.me.classYear} · {USERS.me.major}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">Posting to Public Feed</p>
              </div>
            </div>

            {/* Post Type Selector - Horizontal Scroll, Monochrome */}
            <div className="mb-6">
               <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
                {POST_TYPES.map((t) => {
                  const isActive = postType === t.type;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.type}
                      onClick={() => setPostType(t.type as any)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center w-24 p-3 rounded-xl border transition-all duration-200 ${
                        isActive 
                          ? 'bg-gray-900 border-gray-900 text-white shadow-md' 
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="text-xs font-bold leading-none">{t.label}</span>
                    </button>
                  );
                })}
               </div>
            </div>

            {/* Medical Urgent Toggle - Clean */}
            {postType === PostType.MEDICAL && (
              <div className="mb-6 rounded-xl p-3 border border-red-100 bg-red-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Urgent Request</p>
                    <p className="text-xs text-gray-500">Notify medical professionals immediately</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${isUrgent ? 'bg-red-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${isUrgent ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            )}
            
            {/* Text Area */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's happening?`}
              className="w-full min-h-[120px] resize-none text-gray-900 placeholder:text-gray-400 focus:outline-none text-base leading-relaxed bg-transparent mb-4"
              autoFocus
            />

            {/* Image Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4 animate-in fade-in">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative aspect-square group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 ${draggedImgIndex === index ? 'opacity-50' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <GripHorizontal className="text-white w-5 h-5 cursor-grab active:cursor-grabbing" />
                      <button onClick={() => removeImage(index)} className="text-white hover:text-red-400">
                         <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {images.length < 10 && (
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                   >
                      <ImageIcon className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-bold">Add</span>
                   </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
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
              className="p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 rounded-full transition-all"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 rounded-full transition-all">
              <MapPin className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={closeCreatePost}
            className="px-6 py-2 rounded-full font-bold text-sm bg-gray-900 text-white shadow-md hover:bg-black transition-all disabled:opacity-50 disabled:shadow-none"
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
