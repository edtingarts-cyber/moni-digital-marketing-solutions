import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Search, UserCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { initAuth, logout } from '../services/firebase.ts';
import { User } from 'firebase/auth';

interface NavbarProps {
  onOpenCheckout: () => void;
  onOpenTrackOrder: () => void;
  onOpenAdmin: () => void;
  onOpenStudentPortal: () => void;
  onOpenSecurityCenter: () => void;
  hasVerifiedAccess: boolean;
  activeOrderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCheckout,
  onOpenTrackOrder,
  onOpenAdmin,
  onOpenStudentPortal,
  onOpenSecurityCenter,
  hasVerifiedAccess,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth((currentUser) => {
      setUser(currentUser);
    }, () => {
      setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-300">
                M
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">Moni Digital Marketing</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Solutions</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Payee UPI: <span className="font-mono text-slate-300">edtingarts-2@oksbi</span>
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => {
                const el = document.getElementById('products-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-sm font-medium text-amber-300 hover:text-white hover:bg-amber-950/40 rounded-lg transition"
            >
              All Products &amp; Courses (3)
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('curriculum-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
            >
              Mastery Curriculum
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('upi-guide-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
            >
              UPI Payment Guide
            </button>
            <button
              onClick={onOpenTrackOrder}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-indigo-400" />
              Track Order / UTR
            </button>
            <button
              onClick={onOpenSecurityCenter}
              className="px-3.5 py-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-lg transition flex items-center gap-1.5 border border-emerald-500/20"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              Security Center
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Student Course Portal Access */}
            <button
              onClick={onOpenStudentPortal}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-1.5 transition ${
                hasVerifiedAccess
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{hasVerifiedAccess ? 'Student Portal (Unlocked)' : 'Course Portal'}</span>
              {hasVerifiedAccess && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 ml-0.5" />}
            </button>

            {/* Admin Verification Portal Button */}
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2 text-xs sm:text-sm font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition flex items-center gap-1.5"
              title="Admin Bank Verification & Approval"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Admin</span> Portal
            </button>

            {/* Enroll CTA Button */}
            <button
              onClick={onOpenCheckout}
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              Pay ₹5,999
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
