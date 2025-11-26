
import React, { useState } from 'react';
import { GraduationCap, UserCircle, Mail, Shield, Eye, EyeOff } from 'lucide-react';

export const AuthPage = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[100px] opacity-30"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200 rounded-full blur-[100px] opacity-30"></div>
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-indigo-50 rounded-2xl mb-4 text-indigo-600">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Connect with your alumni network</p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-xl mb-8 relative">
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ${isLogin ? 'left-1' : 'left-[calc(50%+4px)]'}`}></div>
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${isLogin ? 'text-gray-900' : 'text-gray-500'}`}>Sign In</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${!isLogin ? 'text-gray-900' : 'text-gray-500'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
             <div className="space-y-1.5">
               <label className="text-xs font-bold text-gray-900 ml-1">Full Name</label>
               <div className="relative">
                 <UserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                 <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="John Doe" />
               </div>
             </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-900 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="name@example.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-900 ml-1">Password</label>
            <div className="relative">
              <Shield className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type={showPassword ? "text" : "password"} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-10 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
};
