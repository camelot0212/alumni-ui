
import React from 'react';
import { GraduationCap, Users, Briefcase, ChevronDown, Building2 } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { USERS } from '../constants';

const DirectoryPage = () => {
  const { openContactModal } = useUI();
  const users = Object.values(USERS).filter(u => u.id !== 'me');

  const Dropdown = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="relative flex-shrink-0">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Icon className="w-4 h-4" />
      </div>
      <select className="appearance-none bg-white border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer hover:border-indigo-300 transition-colors min-w-[140px]">
        <option>{label}</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 pb-24 md:pb-8">
      {/* Filters with horizontal scroll fix */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2 mb-4 no-scrollbar">
        <div className="flex gap-3 w-max">
           <Dropdown icon={GraduationCap} label="Cohort (Khóa)" />
           <Dropdown icon={Users} label="Class (Lớp)" />
           <Dropdown icon={Briefcase} label="Industry" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4 hover:border-indigo-300 transition-colors group shadow-sm">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border border-gray-100" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
              <div className="flex items-center gap-2 mt-0.5 mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">{user.classYear}</span>
                <span className="text-xs text-gray-500 font-medium">{user.major}</span>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-xs text-gray-600 truncate flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-gray-400"/> {user.company || 'Open to work'}</p>
                <p className="text-xs text-gray-600 truncate flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-400"/> {user.industry}</p>
              </div>
              <button 
                onClick={() => openContactModal(user)}
                className="w-full py-1.5 text-xs font-bold text-indigo-600 border border-indigo-100 bg-indigo-50/50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectoryPage;
