
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle2, HelpCircle, Send, Image as ImageIcon, X, Megaphone, ChevronDown, ChevronUp, ChevronRight, Heart, Trash2 } from 'lucide-react';
import { MOCK_EVENTS, USERS } from '../constants';

const EventDetailPage = () => {
  const { id } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === id);
  
  // States
  const [rsvp, setRsvp] = useState<'going' | 'maybe' | 'not_going' | null>(event?.myRsvp || null);
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);
  const [attendeeTab, setAttendeeTab] = useState<'going' | 'maybe'>('going');
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  // Comments State
  const [comments, setComments] = useState([
    { id: 1, user: USERS.u1, content: "Looking forward to this! Will there be parking available?", time: "2h", image: null, likes: 0, isLiked: false },
    { id: 2, user: USERS.u3, content: "Check out the venue setup from last year!", time: "5h", image: "https://picsum.photos/id/20/400/300", likes: 5, isLiked: true },
    { id: 3, user: USERS.me, content: "I'll be there early to help set up.", time: "1m", image: null, likes: 0, isLiked: false }
  ]);

  if (!event) return <div>Not found</div>;

  const isOrganizer = event.organizer.id === USERS.me.id;

  const galleryImages = [
    'https://picsum.photos/id/101/300/200',
    'https://picsum.photos/id/102/300/200', 
    'https://picsum.photos/id/103/300/200',
    'https://picsum.photos/id/104/300/200'
  ];

  const updates = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    text: i === 0 ? "⚠️ We've moved the venue to the Grand Ballroom on the 2nd floor. Please use the East Elevator." : `Update #${i}: Just a reminder to bring your tickets and ID for check-in.`,
    time: `${i + 2}h ago`,
    isNew: i === 0
  }));

  const handleRsvp = (status: 'going' | 'maybe') => {
    setRsvp(prev => prev === status ? null : status);
  };

  const handleCommentLike = (commentId: number) => {
    setComments(prevComments => prevComments.map(c => {
      if (c.id === commentId) {
        const newIsLiked = !c.isLiked;
        return {
          ...c,
          isLiked: newIsLiked,
          likes: newIsLiked ? c.likes + 1 : c.likes - 1
        };
      }
      return c;
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  return (
    <div className="bg-white min-h-screen pb-24">
       {/* Hero Image - Clean */}
       <div className="relative h-64 md:h-80 w-full bg-gray-100 group">
          <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
       </div>

       <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            
            {/* Header Section */}
            <div className="p-6 md:p-8 border-b border-gray-100">
               <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${new Date(event.date) > new Date() ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                    {new Date(event.date) > new Date() ? 'Upcoming Event' : 'Past Event'}
                  </span>
               </div>

               <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">{event.title}</h1>

               {/* Info Layout - 2 Lines */}
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-900">
                     <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <Calendar className="w-5 h-5" />
                     </div>
                     <p className="font-bold text-lg">
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                        <span className="mx-2 text-gray-300">|</span>
                        {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                     </p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-900">
                     <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                     </div>
                     <p className="font-medium text-lg text-gray-700">{event.location}</p>
                  </div>
               </div>
            </div>

            {/* RSVP Section - High Visibility Card */}
            {!isOrganizer && (
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                 {/* Social Proof with Avatar Stack */}
                 <div 
                    onClick={() => setShowAttendeesModal(true)}
                    className="flex items-center gap-4 cursor-pointer group w-full md:w-auto"
                 >
                    <div className="flex items-center -space-x-3">
                        {event.attendees.slice(0, 3).map(u => (
                            <img key={u.id} src={u.avatar} className="w-9 h-9 rounded-full border-2 border-white object-cover bg-gray-200" />
                        ))}
                        <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600">
                            +{event.attendees.length + 12}
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">See who's going</p>
                        <p className="text-xs text-gray-500 font-medium">Join 19 others</p>
                    </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex w-full md:w-auto gap-2">
                    <button 
                       onClick={() => handleRsvp('maybe')}
                       className={`flex-1 md:flex-none px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm border ${
                          rsvp === 'maybe' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                       }`}
                    >
                       <HelpCircle className="w-4 h-4" /> Maybe
                    </button>
                    <button 
                       onClick={() => handleRsvp('going')}
                       className={`flex-1 md:flex-none px-5 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm shadow-sm ${
                          rsvp === 'going' 
                          ? 'bg-emerald-600 border border-emerald-600 text-white shadow-emerald-200' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
                       }`}
                    >
                       <CheckCircle2 className="w-4 h-4" /> Going
                    </button>
                 </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
             
             {/* Announcements - Sleek Card */}
             <section>
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Announcements</h3>
                 </div>
                 
                 {/* Featured Latest Update */}
                 {/* Added pb-6 to prevent button cut-off */}
                 <div className="bg-gradient-to-r from-indigo-50/80 to-white border border-indigo-100 rounded-xl pt-5 pb-6 px-5 shadow-sm relative mb-4">
                    <div className="flex items-center gap-2 mb-2">
                       <Megaphone className="w-4 h-4 text-indigo-600" />
                       <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Latest Update</span>
                       <span className="text-xs text-gray-400 font-medium">• {updates[0].time}</span>
                    </div>
                    <p className="text-gray-900 font-medium text-sm leading-relaxed">{updates[0].text}</p>
                    
                    {/* Centered Circular Toggle Button - Only show here if NOT expanded */}
                    {!showAllUpdates && updates.length > 1 && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-1/2 z-20">
                        <button 
                          onClick={() => setShowAllUpdates(true)}
                          className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                 </div>

                 {/* Older Updates - Expanded View */}
                 {updates.length > 1 && showAllUpdates && (
                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                       {updates.slice(1).map((update) => (
                          <div key={update.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-gray-500">Update</span>
                                <span className="text-xs text-gray-400">{update.time}</span>
                             </div>
                             <p className="text-gray-700 text-sm leading-relaxed">{update.text}</p>
                          </div>
                       ))}
                       
                       {/* Collapse Button - Moved here so it's at the end of the list */}
                       <div className="flex justify-center pt-2">
                          <button 
                            onClick={() => setShowAllUpdates(false)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 )}
             </section>

             <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                   {/* Hosted By - Above About */}
                   <section>
                      <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-indigo-200 transition-colors cursor-pointer group">
                         <img src={event.organizer.avatar} className="w-14 h-14 rounded-full border border-gray-100 group-hover:scale-105 transition-transform" />
                         <div className="flex-1">
                            <p className="font-bold text-gray-900 text-base">{event.organizer.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{event.organizer.classYear} · {event.organizer.major}</p>
                         </div>
                      </div>
                   </section>

                   {/* About Event */}
                   <section>
                      <h3 className="font-bold text-gray-900 text-lg mb-3">About Event</h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                   </section>
                </div>
             </div>

             {/* Gallery */}
             <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Gallery <span className="text-gray-400 text-base font-normal">({galleryImages.length})</span></h3>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">View All <ChevronRight className="w-4 h-4"/></button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                   {galleryImages.map((img, i) => (
                      <img key={i} src={img} className="h-32 w-48 object-cover rounded-lg flex-shrink-0 border border-gray-100 hover:opacity-90 transition-opacity cursor-pointer" />
                   ))}
                </div>
             </section>

             {/* Discussion */}
             <section>
                <h3 className="font-bold text-gray-900 text-lg mb-6">Discussion <span className="text-gray-400 text-base font-normal">({comments.length})</span></h3>
                <div className="space-y-6 mb-8">
                   {comments.map(c => (
                      <div key={c.id} className="flex gap-3 items-start">
                         <img src={c.user.avatar} className="w-9 h-9 rounded-full border border-gray-100 flex-shrink-0" />
                         <div className="flex-1">
                            {/* Comment Bubble */}
                            <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-2.5 border border-gray-100 inline-block relative group min-w-[200px]">
                               {/* Timestamp in Header */}
                               <div className="flex items-center gap-2 mb-0.5">
                                 <span className="font-bold text-gray-900 text-sm">{c.user.name}</span>
                                 <span className="text-xs text-gray-400 font-medium">• {c.time}</span>
                               </div>
                               <p className="text-gray-800 text-sm leading-relaxed">{c.content}</p>
                               {c.image && (
                                  <img src={c.image} className="mt-3 rounded-lg w-full max-w-sm object-cover h-40 border border-gray-200 block" />
                               )}
                               
                               {/* Floating Reaction Badge (Matches Feed Style) */}
                               {c.likes > 0 && (
                                 <div className="absolute -bottom-2.5 -right-1 bg-white rounded-full px-1.5 py-0.5 shadow-sm border border-gray-100 flex items-center gap-1 z-10">
                                   <Heart className="w-3 h-3 fill-current text-pink-600" />
                                   <span className="text-[10px] font-bold text-gray-600">{c.likes}</span>
                                 </div>
                               )}
                            </div>

                            {/* Interactions Row - Outside Bubble */}
                            <div className="flex items-center gap-4 mt-1.5 ml-2">
                               <button 
                                 onClick={() => handleCommentLike(c.id)}
                                 className={`text-xs font-bold flex items-center gap-1 transition-colors ${c.isLiked ? 'text-pink-600' : 'text-gray-500 hover:text-gray-800'}`}
                               >
                                 <Heart className={`w-3 h-3 ${c.isLiked ? 'fill-current' : ''}`} />
                                 Like
                               </button>
                               <button className="text-xs font-bold text-gray-500 hover:text-gray-800">Reply</button>
                               {c.user.id === USERS.me.id && (
                                  <button onClick={() => handleDeleteComment(c.id)} className="text-xs font-bold text-gray-400 hover:text-red-600 flex items-center gap-1">
                                    <Trash2 className="w-3 h-3" /> Delete
                                  </button>
                               )}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
                
                {/* Comment Input with Tightly Grouped Actions */}
                <div className="flex gap-3 items-end">
                   <img src={USERS.me.avatar} className="w-9 h-9 rounded-full mb-1" />
                   <div className="flex-1 bg-white border border-gray-300 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all shadow-sm overflow-hidden">
                      
                      {/* Input Row */}
                      <div className="flex items-center p-2 pl-3">
                         <input 
                            type="text" 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..." 
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder:text-gray-400" 
                         />
                         
                         {/* Grouped Actions: Attach & Send (Tight Spacing) */}
                         <div className="flex items-center gap-0.5 ml-1">
                             <button 
                               onClick={() => !attachedImage && setAttachedImage('https://picsum.photos/id/50/200/200')}
                               className={`p-1.5 rounded-full transition-colors ${attachedImage ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-50'}`}
                             >
                                <ImageIcon className="w-5 h-5" />
                             </button>
                             <button className={`p-1.5 rounded-full transition-colors ${commentText || attachedImage ? 'text-indigo-600 hover:bg-indigo-50 font-bold' : 'text-gray-300'}`}>
                                <Send className="w-5 h-5" />
                             </button>
                         </div>
                      </div>

                      {/* Attached Image Preview Area - BELOW Input */}
                      {attachedImage && (
                        <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                           <div className="relative w-fit group">
                              <img src={attachedImage} className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm" />
                              <button 
                                 onClick={() => setAttachedImage(null)}
                                 className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full p-1 shadow-md hover:bg-black transition-colors"
                              >
                                 <X className="w-3 h-3" />
                              </button>
                           </div>
                        </div>
                      )}
                   </div>
                </div>
             </section>
          </div>
       </div>

       {/* Attendees Modal */}
       {showAttendeesModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden h-[500px] flex flex-col animate-in zoom-in-95">
               <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Guest List</h3>
                  <button onClick={() => setShowAttendeesModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500"/></button>
               </div>
               <div className="flex p-2 gap-2 bg-gray-50 border-b border-gray-100">
                  <button 
                     onClick={() => setAttendeeTab('going')}
                     className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${attendeeTab === 'going' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                     Going (15)
                  </button>
                  <button 
                     onClick={() => setAttendeeTab('maybe')}
                     className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${attendeeTab === 'maybe' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                     Maybe (4)
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(attendeeTab === 'going' ? event.attendees : [USERS.u3]).map(u => (
                     <div key={u.id} className="flex items-center gap-3">
                        <img src={u.avatar} className="w-10 h-10 rounded-full border border-gray-100" />
                        <div>
                           <p className="font-bold text-gray-900 text-sm">{u.name}</p>
                           <p className="text-xs text-gray-500">{u.classYear} · {u.major}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default EventDetailPage;
