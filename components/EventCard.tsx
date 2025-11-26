import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, MessageCircle, CheckCircle2, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const [rsvp, setRsvp] = useState<'going' | 'maybe' | 'not_going' | null>(event.myRsvp);

  const handleRsvp = (e: React.MouseEvent, status: 'going' | 'maybe') => {
    e.stopPropagation();
    // Toggle off if clicking the same status
    setRsvp(prev => prev === status ? null : status);
  };

  return (
    <div 
      onClick={() => navigate(`/event/${event.id}`)} 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all cursor-pointer relative"
    >
      {/* Date Badge / Image Section */}
      <div className="h-48 md:w-2/5 md:h-auto relative overflow-hidden">
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-center shadow-sm z-10 border border-gray-100">
          <div className="text-xs text-indigo-600 uppercase font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
          <div className="text-xl font-bold text-gray-900 leading-none">{new Date(event.date).getDate()}</div>
        </div>
        
        {/* RSVP Status Badge on Image */}
        {rsvp === 'going' && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Going
          </div>
        )}

        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{event.title}</h3>
          
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              {/* "Happening Now" Logic mock */}
              {event.id === 'e1' && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">LIVE</span>}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 mt-2">
          <div className="flex items-center justify-between">
            {/* Inline RSVP Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={(e) => handleRsvp(e, 'going')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  rsvp === 'going' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Going
              </button>
              <button 
                onClick={(e) => handleRsvp(e, 'maybe')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  rsvp === 'maybe' 
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Maybe
              </button>
            </div>

            {/* Comment Count */}
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
              <MessageCircle className="w-4 h-4" /> <span>8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;