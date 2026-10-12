import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  ShieldCheck,
  Smartphone,
  BookOpen,
  CheckCircle2,
  Search,
  Phone,
  MessageCircle
} from 'lucide-react';
import { MONI_COURSE } from '../data/courseData.ts';

interface FAQSectionProps {
  onOpenCheckout: () => void;
  onOpenTrackOrder: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'Enrollment' | 'Verification' | 'Access' | 'Payment';
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenCheckout,
  onOpenTrackOrder,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs: FAQItem[] = [
    {
      category: 'Verification',
      question: 'How long does the payment verification take?',
      answer:
        'Admin verification typically takes 15 to 45 minutes during standard working hours (9:00 AM – 9:00 PM IST) and up to a maximum of 2 to 4 hours during off-peak times. Our finance team cross-references your submitted 12-digit UPI UTR number directly against our State Bank of India account credits.',
    },
    {
      category: 'Enrollment',
      question: 'Why does my order show "Pending Verification" after submitting?',
      answer:
        'To prevent fraud and maintain the security of our course platform, access is never granted purely by submitting a form or clicking a button. Your order remains in PENDING VERIFICATION status until our administrator reconciles the transaction with our SBI bank statement.',
    },
    {
      category: 'Payment',
      question: 'What is the official Payee UPI ID and which apps are supported?',
      answer:
        `The official Payee UPI ID for Moni Digital Marketing Solutions is ${MONI_COURSE.payeeUpiId}. You can pay directly via Google Pay, PhonePe, Paytm, BHIM, CRED, or any Indian banking UPI application with zero convenience fees.`,
    },
    {
      category: 'Access',
      question: 'How do I access my course materials once my payment is verified?',
      answer:
        'Once your payment is approved by the admin, click on the "Student Portal" button in the navigation bar or use "Track Order / UTR" to enter your Order ID or registered email. The full learning curriculum, HD video lectures, downloadable SOPs, and templates will unlock automatically.',
    },
    {
      category: 'Payment',
      question: 'Where do I find my 12-digit UPI UTR / Reference ID?',
      answer:
        'After completing the transfer in Google Pay, PhonePe, Paytm, or BHIM, open your completed payment receipt. Look for the "UPI Transaction ID" or "UTR / Bank Ref Number". It is always a 12-digit number (e.g., 410293847561). Copy and enter this into our checkout form.',
    },
    {
      category: 'Enrollment',
      question: 'Can I purchase individual courses or the 3-product bundle?',
      answer:
        'Yes! You can choose an individual course like Google Ads Course (₹1,400), Shopshfly E-Commerce Website (₹999), or Measso Online Selling Business (₹999), select the All-3 Bundle (₹3,398), or enroll in our flagship 8-Module Mastery Blueprint (₹5,999).',
    },
    {
      category: 'Verification',
      question: 'What happens if I submit an incorrect reference number by mistake?',
      answer:
        'If the reference number does not match any incoming credit, the admin will mark the order as REJECTED with a clear note. You can check your status anytime using our Track Order tool and resubmit your valid bank UTR, or contact support at edtingarts@gmail.com.',
    },
    {
      category: 'Access',
      question: 'Do I receive a certificate of completion?',
      answer:
        'Yes! Once your enrollment is verified and you complete your course lessons, you can generate and download an official verified Certificate of Completion issued by Moni Digital Marketing Solutions.',
    },
  ];

  const categories = ['All', 'Verification', 'Enrollment', 'Payment', 'Access'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Enrollment, Payment &amp; Verification FAQs
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about paying with UPI to <strong className="text-slate-200">edtingarts-2@oksbi</strong>, tracking your order status, and accessing your course.
          </p>
        </div>

        {/* Filter Categories & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
              No matching questions found. Try adjusting your search query.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-850 transition select-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                    </div>
                    <div className="shrink-0 ml-2">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Support Callout Card */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Need help with your payment or course enquiry?
            </h4>
            <p className="text-xs text-slate-400">
              Our admissions team is available via direct call or WhatsApp for instant assistance:
            </p>
            <div className="flex items-center gap-3 pt-1 flex-wrap justify-center sm:justify-start">
              <a
                href="tel:+917368066550"
                className="text-amber-300 hover:text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 73680 66550
              </a>
              <a
                href="tel:+916287756485"
                className="text-amber-300 hover:text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 62877 56485
              </a>
              <a
                href="https://wa.me/917368066550?text=Hi%2C%20I%20have%20an%20enquiry%20regarding%20Moni%20Digital%20Marketing%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg transition"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Desk
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTrackOrder}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Track Order / UTR
            </button>
            <button
              onClick={onOpenCheckout}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
            >
              Enroll Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
