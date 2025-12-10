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
      const newImages = Array.from(e.target.files).map((file: File) => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10)); // Limit to 10
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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
    },
    { 
      type: PostType.MEDICAL, 
      label: 'Medical', 
      icon: HeartPulse,
    },
    { 
      type: PostType.EVENT, 
      label: 'Event', 
      icon: Calendar,
    },
    { 
      type: PostType.NEWS, 
      label: 'News', 
      icon: Newspaper,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-white md:bg-black/60 md:backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-lg md:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-5 duration-300 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white z-10 shrink-0">
          <h3 className="font-bold text-lg text-gray-900">Create Post</h3>
          <button onClick={closeCreatePost} className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-5">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-6">
              <img src={USERS.me.avatar} alt="Me" className="w-12 h-12 rounded-full object-cover border border-gray-100" />
              <div>
                <p className="font-bold text-base text-gray-900">{USERS.me.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {USERS.me.classYear} · {USERS.me.major}
                    </span>
                </div>
              </div>
            </div>

            {/* Post Type Selector - Horizontal Scroll & Compact & Monochrome */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5 mb-6 select-none">
              {POST_TYPES.map((t) => {
                const isActive = postType === t.type;
                const Icon = t.icon;
                return (
                  <button
                    key={t.type}
                    onClick={() => setPostType(t.type as any)}
                    className={`flex-shrink-0 min-w-[100px] flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all duration-200 ${
                      isActive 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-[1.02]' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className="text-xs font-bold leading-tight">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Medical Urgent Toggle - Compact */}
            {postType === PostType.MEDICAL && (
              <div className={`mb-6 rounded-xl px-4 py-3 border transition-all duration-300 flex items-center justify-between ${
                isUrgent ? 'bg-red-50/50 border-red-200' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isUrgent ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold leading-none ${isUrgent ? 'text-red-900' : 'text-gray-900'}`}>Mark as Urgent</p>
                    <p className="text-xs text-gray-500 leading-tight mt-1">Notify medical professionals instantly</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${isUrgent ? 'bg-red-500' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${isUrgent ? 'translate-x-5.5 left-0.5' : 'translate-x-0.5 left-0'}`} />
                </button>
              </div>
            )}
            
            {/* Text Area */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`What's on your mind?`}
              className="w-full min-h-[150px] resize-none text-gray-900 placeholder:text-gray-400 focus:outline-none text-lg leading-relaxed bg-transparent"
              autoFocus
            />

            {/* Image Grid - Compact */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4 animate-in fade-in">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative aspect-square group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm ${draggedImgIndex === index ? 'opacity-50 ring-2 ring-indigo-500' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <button 
                        onClick={() => removeImage(index)} 
                        className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 scale-90 group-hover:scale-100"
                    >
                         <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {images.length < 10 && (
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                   >
                      <ImageIcon className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-bold">Add</span>
                   </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white md:bg-gray-50/50 shrink-0 pb-safe md:pb-3">
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
              className="p-2.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 rounded-xl transition-all"
              title="Add Photos"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 rounded-xl transition-all">
              <MapPin className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={closeCreatePost}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
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