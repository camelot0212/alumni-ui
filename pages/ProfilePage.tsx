
import React, { useState } from 'react';
import { Edit3, Shield, Bell, User, Briefcase, MapPin, GraduationCap } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { USERS } from '../constants';

const ProfilePage = () => {
  const { showToast } = useUI();
  const [isEditing, setIsEditing] = useState(false);
  const [privacy, setPrivacy] = useState({ showEmail: false, showPhone: false });
  const [notis, setNotis] = useState({ medical: true, jobs: true });

  const handleToggle = (setter: any, key: string, label: string) => {
    setter((p: any) => {
      const newState = { ...p, [key]: !p[key] };
      showToast(`${label} ${newState[key] ? 'Enabled' : 'Disabled'}`);
      return newState;
    });
  };

  const Toggle = ({ checked, onClick }: { checked: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5.5 left-0.5' : 'translate-x-0.5 left-0'}`} />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-8">
       {/* Profile Header - Centered & Clean */}
       <div className="bg-white p-8 md:rounded-2xl md:mt-6 md:border md:border-gray-200 md:shadow-sm flex flex-col items-center text-center">
          <div className="relative mb-4">
             <div className="w-28 h-28 rounded-full p-1 border-2 border-indigo-100 bg-white">
                <img src={USERS.me.avatar} className="w-full h-full rounded-full object-cover" />
             </div>
             <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full border-4 border-white shadow-sm hover:bg-black transition-colors">
                <Edit3 className="w-4 h-4" />
             </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{USERS.me.name}</h1>
          <p className="text-gray-500 font-medium mb-6">Alumni Member</p>
          
          <div className="flex items-center justify-center gap-3 w-full">
             <button onClick={() => setIsEditing(!isEditing)} className="flex-1 max-w-xs px-6 py-2.5 rounded-xl font-bold text-sm bg-gray-900 text-white shadow-lg shadow-gray-200 hover:bg-black transition-all active:scale-95">
               {isEditing ? 'Save Changes' : 'Edit Profile'}
             </button>
          </div>
       </div>

       <div className="mt-6 px-4 md:px-0 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600"/> 
                <span className="font-bold text-gray-900">Personal Information</span>
             </div>
             <div className="p-6 space-y-6">
                
                {/* Major & Class Section */}
                <div className="pb-6 border-b border-gray-100">
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <GraduationCap className="w-3 h-3" /> Major & Class
                   </h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="text-xs font-semibold text-gray-500 mb-1 block">Class Year</label>
                         <input disabled={!isEditing} type="text" value={USERS.me.classYear} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 disabled:bg-transparent disabled:border-transparent disabled:p-0" />
                      </div>
                      <div>
                         <label className="text-xs font-semibold text-gray-500 mb-1 block">Major</label>
                         <input disabled={!isEditing} type="text" value={USERS.me.major} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 disabled:bg-transparent disabled:border-transparent disabled:p-0" />
                      </div>
                   </div>
                </div>

                {/* Work Section */}
                <div>
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Briefcase className="w-3 h-3" /> Work
                   </h3>
                   <div className="space-y-4">
                      <div>
                         <label className="text-xs font-semibold text-gray-500 mb-1 block">Company</label>
                         <input disabled={!isEditing} type="text" value={USERS.me.company} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 disabled:bg-transparent disabled:border-transparent disabled:p-0" />
                      </div>
                      <div>
                         <label className="text-xs font-semibold text-gray-500 mb-1 block">Industry</label>
                         <input disabled={!isEditing} type="text" value={USERS.me.industry} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 disabled:bg-transparent disabled:border-transparent disabled:p-0" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Settings Group */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600"/> 
                  <span className="font-bold text-gray-900">Privacy</span>
               </div>
               <div className="p-6 space-y-5">
                  <div className="flex justify-between items-center">
                     <div><p className="text-sm font-bold text-gray-900">Email</p><p className="text-xs text-gray-500">Visible to alumni</p></div>
                     <Toggle checked={privacy.showEmail} onClick={() => handleToggle(setPrivacy, 'showEmail', 'Email Visibility')} />
                  </div>
                  <div className="flex justify-between items-center">
                     <div><p className="text-sm font-bold text-gray-900">Phone</p><p className="text-xs text-gray-500">Visible to alumni</p></div>
                     <Toggle checked={privacy.showPhone} onClick={() => handleToggle(setPrivacy, 'showPhone', 'Phone Visibility')} />
                  </div>
               </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-orange-500"/> 
                  <span className="font-bold text-gray-900">Notifications</span>
               </div>
               <div className="p-6 space-y-5">
                  <div className="flex justify-between items-center">
                     <div><p className="text-sm font-bold text-gray-900">Medical</p><p className="text-xs text-gray-500">Urgent alerts</p></div>
                     <Toggle checked={notis.medical} onClick={() => handleToggle(setNotis, 'medical', 'Medical Alerts')} />
                  </div>
                  <div className="flex justify-between items-center">
                     <div><p className="text-sm font-bold text-gray-900">Jobs</p><p className="text-xs text-gray-500">New vacancies</p></div>
                     <Toggle checked={notis.jobs} onClick={() => handleToggle(setNotis, 'jobs', 'Job Alerts')} />
                  </div>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default ProfilePage;
