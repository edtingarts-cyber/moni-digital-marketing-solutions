import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  QrCode
} from 'lucide-react';
import { MONI_COURSE } from '../data/courseData.ts';

interface CourseHeroProps {
  onOpenCheckout: () => void;
  onOpenTrackOrder: () => void;
}

export const CourseHero: React.FC<CourseHeroProps> = ({ onOpenCheckout, onOpenTrackOrder }) => {
  const formattedPrice = `₹${MONI_COURSE.price.toLocaleString('en-IN')}`;
  const formattedOriginalPrice = `₹${MONI_COURSE.originalPrice.toLocaleString('en-IN')}`;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            2026 Agency-Grade Curriculum
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Direct UPI to SBI: <span className="font-mono text-emerald-200">edtingarts-2@oksbi</span>
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Master High-Impact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              Digital Marketing
            </span>{' '}
            &amp; Scale 6-Figure Retainers
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {MONI_COURSE.description}
          </p>
        </div>

        {/* Pricing Card & CTA Row */}
        <div className="mt-10 max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500/20 to-transparent w-48 h-48 pointer-events-none rounded-full blur-2xl"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">Limited Enrollment Special</span>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md">Save 60%</span>
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{formattedPrice}</span>
                <span className="text-lg text-slate-400 line-through font-medium">{formattedOriginalPrice}</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">One-time payment</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                Pay via PhonePe, Google Pay, Paytm or any UPI app
              </p>
            </div>

            {/* Pay with UPI CTA Buttons */}
            <div className="space-y-2.5 shrink-0">
              <button
                onClick={onOpenCheckout}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <QrCode className="w-5 h-5 text-amber-300" />
                <span>Pay with UPI &bull; {formattedPrice}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <div className="text-center">
                <button
                  onClick={onOpenTrackOrder}
                  className="text-xs text-slate-400 hover:text-indigo-300 transition underline underline-offset-4"
                >
                  Already paid? Track your order status
                </button>
              </div>
            </div>
          </div>

          {/* Value inclusions checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>48+ Hours Video Training</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100+ Swipe Files &amp; SOPs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Certificate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Strict Bank Verification</span>
            </div>
          </div>

        </div>

        {/* Social Proof Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
            <div className="text-2xl font-extrabold text-white">4.9 / 5.0</div>
            <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-1">
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span>(1,480+ Reviews)</span>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
            <div className="text-2xl font-extrabold text-white">8 Modules</div>
            <div className="text-xs text-slate-400 mt-1">Full-Stack Curriculum</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
            <div className="text-2xl font-extrabold text-indigo-400">₹5,999</div>
            <div className="text-xs text-slate-400 mt-1">Payee: edtingarts-2@oksbi</div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl">
            <div className="text-2xl font-extrabold text-emerald-400">SBI Verified</div>
            <div className="text-xs text-slate-400 mt-1">Manual Reconciliation</div>
          </div>
        </div>

      </div>
    </section>
  );
};
