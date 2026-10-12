import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileCheck2,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { MONI_COURSE } from '../data/courseData.ts';

interface UpiPaymentGuideSectionProps {
  onOpenCheckout: () => void;
  onOpenTrackOrder: () => void;
}

export const UpiPaymentGuideSection: React.FC<UpiPaymentGuideSectionProps> = ({
  onOpenCheckout,
  onOpenTrackOrder,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(MONI_COURSE.payeeUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'Scan QR or Pay with UPI App',
      desc: `Open Google Pay, PhonePe, Paytm, or BHIM. Pay ₹5,999 to payee UPI: ${MONI_COURSE.payeeUpiId}.`,
    },
    {
      num: '02',
      title: 'Copy 12-Digit UTR Number',
      desc: 'In your completed payment receipt, note the 12-digit UPI Transaction ID or Bank Reference / UTR Number.',
    },
    {
      num: '03',
      title: 'Submit Reference & Details',
      desc: 'Enter your student name, email, and reference ID in our checkout form. Order status will be PENDING VERIFICATION.',
    },
    {
      num: '04',
      title: 'Admin Verification & Unlock',
      desc: 'Our finance team verifies the credit on our State Bank of India account and immediately unlocks your course portal.',
    },
  ];

  return (
    <section id="upi-guide-section" className="py-20 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Payment &amp; Verification Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How UPI Payment &amp; Verification Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            100% transparent direct bank transfer with zero credit card convenience fees and rigorous manual reconciliation.
          </p>
        </div>

        {/* Payee Info Highlight Box */}
        <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-12 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Payee VPA</span>
            <div className="text-lg font-mono font-bold text-white mt-0.5">{MONI_COURSE.payeeUpiId}</div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              State Bank of India &bull; Fixed Fee: ₹5,999.00
            </p>
          </div>
          <button
            onClick={handleCopyUpi}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 rounded-xl border border-indigo-500/30 transition shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied VPA!' : 'Copy UPI ID'}</span>
          </button>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="text-3xl font-black text-indigo-500/40 font-mono mb-4">
                {step.num}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Assurance Guarantee */}
        <div className="mt-12 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Why are orders kept in Pending status?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                We reconcile all payments directly with bank statements before activating access, preventing unauthorized claims and ensuring your account is properly enrolled.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTrackOrder}
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-700 transition shrink-0"
          >
            Track Existing Order
          </button>
        </div>

      </div>
    </section>
  );
};
