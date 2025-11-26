
import React, { useState } from 'react';
import { Edit3, Shield, Bell } from 'lucide-react';
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
    <button onClick={onClick} className={`w-12 h-7 rounded-full transition-colors relative ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-8">
       <div className="bg-white p-6 md:rounded-xl md:mt-6 md:border md:border-gray-200 md:shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
             <img src={USERS.me.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
             <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-1.5 rounded-full"><Edit3 className="w-3 h-3" /></button>
          </div>
          <div className="text-center md:text-left flex-1">
             <h1 className="text-2xl font-bold text-gray-900">{USERS.me.name}</h1>
             <p className="text-gray-500 font-medium mb-2">{USERS.me.classYear} · {USERS.me.major}</p>
             <button onClick={() => setIsEditing(!isEditing)} className="px-5 py-2 rounded-full font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">{isEditing ? 'Save Changes' : 'Edit Profile'}</button>
          </div>
       </div>

       <div className="mt-6 px-4 md:px-0 grid gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 font-bold text-gray-900 flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-600"/> Privacy Settings</div>
             <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                   <div><p className="text-sm font-bold">Show Email</p><p className="text-xs text-gray-500">Visible to alumni</p></div>
                   <Toggle checked={privacy.showEmail} onClick={() => handleToggle(setPrivacy, 'showEmail', 'Email Visibility')} />
                </div>
                <div className="flex justify-between items-center">
                   <div><p className="text-sm font-bold">Show Phone</p><p className="text-xs text-gray-500">Visible to alumni</p></div>
                   <Toggle checked={privacy.showPhone} onClick={() => handleToggle(setPrivacy, 'showPhone', 'Phone Visibility')} />
                </div>
             </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 font-bold text-gray-900 flex items-center gap-2"><Bell className="w-4 h-4 text-orange-500"/> Notifications</div>
             <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                   <div><p className="text-sm font-bold">Medical Support</p><p className="text-xs text-gray-500">Urgent alerts</p></div>
                   <Toggle checked={notis.medical} onClick={() => handleToggle(setNotis, 'medical', 'Medical Alerts')} />
                </div>
                <div className="flex justify-between items-center">
                   <div><p className="text-sm font-bold">Job Opportunities</p><p className="text-xs text-gray-500">New vacancies</p></div>
                   <Toggle checked={notis.jobs} onClick={() => handleToggle(setNotis, 'jobs', 'Job Alerts')} />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ProfilePage;
