
import React from 'react';
import { PlusSquare, History } from 'lucide-react';
import EventCard from '../components/EventCard';
import { MOCK_EVENTS } from '../constants';

const EventsPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 pb-24 md:pb-8">
      {/* Header: Title on Left, Actions on Right */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
        
        <div className="flex items-center gap-3">
          <button className="text-gray-500 font-medium text-sm flex items-center gap-1 hover:text-gray-900 transition-colors">
            <History className="w-4 h-4" /> View Past
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95">
            <PlusSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Create Event</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {MOCK_EVENTS.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
