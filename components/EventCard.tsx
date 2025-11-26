import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/event/${event.id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="h-48 md:w-2/5 md:h-auto relative overflow-hidden">
         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-center shadow-sm z-10">
           <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
             {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
           </div>
           <div className="text-xl font-bold text-gray-900 leading-none">
             {new Date(event.date).getDate()}
           </div>
         </div>
        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
          
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
               <Calendar className="w-4 h-4 text-indigo-500" />
               {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-600">
               <MapPin className="w-4 h-4 text-indigo-500" />
               {event.location}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
           <div className="flex -space-x-2">
             {event.attendees.map(u => (
               <img key={u.id} src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100" title={u.name} />
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-500 ring-1 ring-gray-100">
               +12
             </div>
           </div>

           <div className="flex gap-2.5">
             <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
               Maybe
             </button>
             <button className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
               View
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;