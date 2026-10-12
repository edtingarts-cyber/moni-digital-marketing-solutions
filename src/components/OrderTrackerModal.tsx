import React, { useState } from 'react';
import {
  X,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { findOrderByLookup, getStoredOrders, setActiveStudentOrderId } from '../services/orderStorage.ts';
import { Order } from '../types/index.ts';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudentPortal: (verifiedId: string) => void;
  onOpenCheckout: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  onOpenStudentPortal,
  onOpenCheckout,
}) => {
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = findOrderByLookup(query);
    setSearchedOrder(found);
    setHasSearched(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSelectRecent = (order: Order) => {
    setQuery(order.id);
    setSearchedOrder(order);
    setHasSearched(true);
  };

  const recentOrders = getStoredOrders().slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Track UPI Order &amp; Access Status</h3>
              <p className="text-xs text-slate-400">Lookup by Order ID, 12-digit UTR, or registered Email</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Enter Order ID, UTR Reference Number, or Email:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., MDM-10041, 410293847561, or email"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Click Samples */}
          {!hasSearched && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs">
              <span className="text-slate-400 block mb-2 font-medium">Quick Demo Records in System:</span>
              <div className="space-y-1.5">
                {recentOrders.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => handleSelectRecent(o)}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900 hover:bg-slate-800 cursor-pointer transition border border-slate-800/80"
                  >
                    <div>
                      <span className="font-mono font-bold text-indigo-400">{o.id}</span>
                      <span className="text-slate-300 ml-2">({o.studentName})</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        o.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : o.status === 'PENDING_VERIFICATION'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {o.status === 'PENDING_VERIFICATION' ? 'PENDING' : o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Result */}
          {hasSearched && (
            <div>
              {searchedOrder ? (
                <div
                  className={`bg-slate-950 border rounded-2xl p-5 space-y-4 ${
                    searchedOrder.status === 'VERIFIED'
                      ? 'border-emerald-500/50'
                      : searchedOrder.status === 'PENDING_VERIFICATION'
                      ? 'border-amber-500/50'
                      : 'border-rose-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-base">
                          {searchedOrder.id}
                        </span>
                        <button
                          onClick={() => handleCopy(searchedOrder.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{searchedOrder.courseTitle}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                          searchedOrder.status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : searchedOrder.status === 'PENDING_VERIFICATION'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {searchedOrder.status === 'PENDING_VERIFICATION'
                          ? 'PENDING VERIFICATION'
                          : searchedOrder.status}
                      </span>
                    </div>
                  </div>

                  {/* Status Timeline Details */}
                  <div className="bg-slate-900 rounded-xl p-3.5 text-xs space-y-2 border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Student Name:</span>
                      <span className="text-white font-semibold">{searchedOrder.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registered Email:</span>
                      <span className="text-white">{searchedOrder.studentEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Amount Paid:</span>
                      <span className="text-amber-400 font-bold font-mono">₹{searchedOrder.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Payee UPI ID:</span>
                      <span className="text-white font-mono">{searchedOrder.payeeUpiId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Submitted UTR:</span>
                      <span className="text-indigo-400 font-bold font-mono">{searchedOrder.upiTransactionRef}</span>
                    </div>
                    {searchedOrder.verifiedBy && (
                      <div className="flex justify-between pt-1 border-t border-slate-800">
                        <span className="text-slate-400">Verified By:</span>
                        <span className="text-emerald-400">{searchedOrder.verifiedBy}</span>
                      </div>
                    )}
                    {searchedOrder.rejectionReason && (
                      <div className="flex justify-between pt-1 border-t border-slate-800">
                        <span className="text-slate-400">Rejection Reason:</span>
                        <span className="text-rose-400 font-medium">{searchedOrder.rejectionReason}</span>
                      </div>
                    )}
                  </div>

                  {/* Status Feedback & Actions */}
                  {searchedOrder.status === 'VERIFIED' ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Payment verified successfully! Your full access to all course modules is active.</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveStudentOrderId(searchedOrder.id);
                          onClose();
                          onOpenStudentPortal(searchedOrder.id);
                        }}
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Open Student Learning Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : searchedOrder.status === 'PENDING_VERIFICATION' ? (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5 text-xs text-amber-200 bg-amber-950/40 border border-amber-800/40 p-3.5 rounded-xl">
                        <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-300">Awaiting Administrator Bank Match</p>
                          <p className="mt-0.5 text-amber-200/90 text-[11px] leading-relaxed">
                            Your payment submission is registered. Our accounts team verifies all incoming transfers with the State Bank of India netbanking credit log before unlocking course modules. Please allow standard verification time or check back shortly.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5 text-xs text-rose-200 bg-rose-950/40 border border-rose-800/40 p-3.5 rounded-xl">
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-rose-300">Transaction Not Approved</p>
                          <p className="mt-0.5 text-rose-200/90 text-[11px]">
                            {searchedOrder.rejectionReason || 'Please resubmit with a valid bank UTR reference.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCheckout();
                        }}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition"
                      >
                        Resubmit UPI Payment
                      </button>
                    </div>
                  )}

                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-sm font-bold text-white">No Record Found</p>
                  <p className="text-xs text-slate-400">
                    We could not find any order matching "<span className="text-white font-mono">{query}</span>". Please check your Order ID or reference number.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
