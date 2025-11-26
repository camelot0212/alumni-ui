import React, { useState } from 'react';
import { Post, PostType } from '../types';
import { Heart, MessageCircle, Share2, MoreHorizontal, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  isDetailView?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isDetailView = false }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(isDetailView);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleTimestampClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDetailView) navigate(`/post/${post.id}`);
  };

  const isMedical = post.type === PostType.MEDICAL;
  
  // Box Layout: Always rounded, always bordered, consistent margins managed by parent space-y-6
  const containerClasses = `
    bg-white rounded-xl shadow-sm border overflow-hidden transition-all duration-200
    ${isMedical ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200'}
  `;

  return (
    <div className={containerClasses}>
      <div className="p-4 flex justify-between items-start">
        <div className="flex gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 cursor-pointer"/>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 cursor-pointer hover:underline">{post.author.name}</span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{post.author.classYear} · {post.author.major}</span>
            </div>
            <div onClick={handleTimestampClick} className={`text-xs text-gray-500 flex items-center gap-2 ${!isDetailView ? 'cursor-pointer hover:underline' : ''}`}>
              {post.timestamp}
              {post.hashtag && <span className="text-indigo-600 font-medium">{post.hashtag}</span>}
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
      </div>

      {isMedical && (
        <div className="px-4 pb-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${post.isResolved ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {post.isResolved ? <><CheckCircle2 className="w-3.5 h-3.5" /> Resolved</> : <><AlertCircle className="w-3.5 h-3.5" /> {post.isUrgent ? 'Urgent Medical Support' : 'Medical Support'}</>}
          </div>
        </div>
      )}

      <div className={`px-4 pb-2 ${post.isResolved ? 'opacity-70' : ''}`}>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm md:text-base">{post.content}</p>
      </div>

      {post.images.length > 0 && (
        <div className={`mt-2 grid gap-0.5 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.map((img, idx) => (
            <div key={idx} className={`relative overflow-hidden cursor-pointer aspect-square ${post.images.length === 3 && idx === 0 ? 'col-span-2' : ''}`}>
               <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}

      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between mt-2">
        <div className="flex items-center gap-6">
          <button onClick={handleLike} className={`flex items-center gap-2 text-sm font-medium transition-colors ${liked ? 'text-pink-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} /><span>{likeCount}</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
            <MessageCircle className="w-5 h-5" /><span>{post.comments.length}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-600"><Share2 className="w-5 h-5" /></button>
      </div>

      {showComments && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          {post.comments.length > 0 ? (
            <div className="space-y-3 mb-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex gap-2">
                  <img src={comment.user.avatar} className="w-8 h-8 rounded-full" />
                  <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-sm border border-gray-100">
                    <span className="font-semibold text-gray-900 mr-2">{comment.user.name}</span>
                    <span className="text-gray-700">{comment.content}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-gray-400 text-center py-2">No comments yet.</p>}
          
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <input type="text" placeholder="Write a comment..." className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      )}
    </div>
  );
};
export default PostCard;