import React from 'react';
import { X, Phone, Mail, ArrowUpRight, Copy, ShieldCheck } from 'lucide-react';
import { useUI } from '../context/UIContext';

const ContactModal = () => {
  const { contactUser, closeContactModal } = useUI();

  if (!contactUser) return null;

  // Mock data generation based on user ID for demo purposes
  const mockEmail = `${contactUser.name.toLowerCase().replace(/\s+/g, '.')}@alumni.edu.vn`;
  const mockPhone = `+84 9${Math.floor(Math.random() * 100)} ${Math.floor(Math.random() * 1000)} ${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 p-6 pb-8 text-center border-b border-gray-100">
          <button 
            onClick={closeContactModal} 
            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative inline-block">
            <img 
              src={contactUser.avatar} 
              alt={contactUser.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mx-auto mb-3" 
            />
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white" title="Verified Alumni">
               <ShieldCheck className="w-3 h-3" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900">{contactUser.name}</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
             <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">{contactUser.classYear}</span>
             <span className="text-sm text-gray-500">{contactUser.major}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide font-semibold">Contact Information</p>
        </div>

        {/* Actions List */}
        <div className="p-4 space-y-3">
          {/* Email Action */}
          <a 
            href={`mailto:${mockEmail}`}
            className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-400 uppercase">Email Address</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{mockEmail}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500" />
          </a>

          {/* Phone Action */}
          <a 
            href={`tel:${mockPhone}`}
            className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-400 uppercase">Mobile Number</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{mockPhone}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500" />
          </a>
        </div>

        {/* Footer */}
        <div className="p-4 pt-0 text-center">
            <p className="text-xs text-gray-400">
                Contact details are private and shared only within the network.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;