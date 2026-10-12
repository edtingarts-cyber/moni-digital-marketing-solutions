import React from 'react';
import { ShieldCheck, Mail, Smartphone, Award, Lock, Phone, MessageCircle } from 'lucide-react';
import { MONI_COURSE } from '../data/courseData.ts';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenSecurityCenter: () => void;
  onOpenTrackOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenSecurityCenter,
  onOpenTrackOrder,
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-850 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-sm text-white">
                M
              </div>
              <span className="font-bold text-base text-white">Moni Digital Marketing Solutions</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Industry-leading digital marketing training, performance ad frameworks, and agency scaling programs. All enrollments verified directly via State Bank of India UPI payments.
            </p>
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">
                Direct Admissions &amp; Student Enquiry Helpline:
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="tel:+917368066550"
                  className="text-amber-300 hover:text-amber-200 font-mono font-bold flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 73680 66550
                </a>
                <a
                  href="tel:+916287756485"
                  className="text-amber-300 hover:text-amber-200 font-mono font-bold flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 62877 56485
                </a>
                <a
                  href="https://wa.me/917368066550?text=Hi%2C%20I%20have%20an%20enquiry%20regarding%20Moni%20Digital%20Marketing%20courses"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Desk
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> Payee UPI: {MONI_COURSE.payeeUpiId}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Student Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenTrackOrder} className="hover:text-white transition">
                  Track Order / UTR Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('curriculum-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  View 8 Modules
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('faq-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  Enrollment &amp; Verification FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Security Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Internal &amp; Security</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenAdmin} className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Admin Bank Verification
                </button>
              </li>
              <li>
                <button onClick={onOpenSecurityCenter} className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Security Center Audit
                </button>
              </li>
              <li className="text-slate-500 pt-1">
                Support: <span className="text-slate-300">edtingarts@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} Moni Digital Marketing Solutions. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Verified NPCI UPI Architecture &bull; Bank Reconciliation Verified
          </p>
        </div>

      </div>
    </footer>
  );
};
