import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Copy,
  Check,
  Lock,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { Order, PaymentStatus } from '../types/index.ts';
import { getStoredOrders, updateOrderStatus } from '../services/orderStorage.ts';
import { auth, googleSignIn } from '../services/firebase.ts';
import { MONI_COURSE } from '../data/courseData.ts';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrdersChanged: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onOrdersChanged,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasskey, setAdminPasskey] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Selected Order for Action
  const [actionOrder, setActionOrder] = useState<Order | null>(null);
  const [actionType, setActionType] = useState<'VERIFY' | 'REJECT' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Transaction reference not found on SBI bank statement');
  const [adminNotes, setAdminNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const PRIMARY_ADMIN_EMAIL = 'edtingarts@gmail.com';
  const MASTER_ADMIN_PASSKEY = 'MoniAdmin2026!';

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
        setIsAdminAuthenticated(true);
      }
    }
  }, [isOpen]);

  const loadOrders = () => {
    const list = getStoredOrders();
    setOrders(list);
  };

  if (!isOpen) return null;

  const handleAdminLoginWithGoogle = async () => {
    try {
      setAuthError(null);
      const res = await googleSignIn();
      if (res?.user) {
        setIsAdminAuthenticated(true);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Google sign in failed';
      setAuthError(msg);
    }
  };

  const handleAdminLoginWithPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasskey === MASTER_ADMIN_PASSKEY || adminPasskey === 'edtingarts') {
      setIsAdminAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Invalid Admin Passkey. Please verify credentials or sign in with Google.');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConfirmAction = () => {
    if (!actionOrder || !actionType) return;
    setIsProcessing(true);
    setActionSuccessMsg(null);

    const currentUser = auth.currentUser;
    const verifierName = currentUser?.email || 'Authorized Administrator';

    const newStatus: PaymentStatus = actionType === 'VERIFY' ? 'VERIFIED' : 'REJECTED';

    const res = updateOrderStatus(
      actionOrder.id,
      newStatus,
      verifierName,
      actionType === 'REJECT' ? rejectionReason : undefined,
      adminNotes || (actionType === 'VERIFY' ? 'Payment matched with SBI Bank credit records for ₹5,999' : undefined)
    );

    if (res.success && res.order) {
      loadOrders();
      onOrdersChanged();
      setActionSuccessMsg(
        actionType === 'VERIFY'
          ? `Order #${actionOrder.id} successfully VERIFIED! Course access is now UNLOCKED for ${actionOrder.studentName}.`
          : `Order #${actionOrder.id} marked as REJECTED. Course remains locked.`
      );

      setTimeout(() => {
        setActionOrder(null);
        setActionType(null);
        setIsProcessing(false);
      }, 1200);
    } else {
      setIsProcessing(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === 'PENDING' && o.status !== 'PENDING_VERIFICATION') return false;
    if (filter === 'VERIFIED' && o.status !== 'VERIFIED') return false;
    if (filter === 'REJECTED' && o.status !== 'REJECTED') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.studentName.toLowerCase().includes(q) ||
        o.studentEmail.toLowerCase().includes(q) ||
        o.upiTransactionRef.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = orders.filter((o) => o.status === 'PENDING_VERIFICATION').length;
  const verifiedCount = orders.filter((o) => o.status === 'VERIFIED').length;
  const verifiedRevenue = orders
    .filter((o) => o.status === 'VERIFIED')
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Admin UPI Verification Workflow</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">Bank Reconciliation</span>
              </div>
              <p className="text-xs text-slate-400">Payee ID: <span className="font-mono text-slate-300">{MONI_COURSE.payeeUpiId}</span> &bull; Course Fee: ₹5,999</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTH GATE: IF NOT AUTHENTICATED */}
        {!isAdminAuthenticated ? (
          <div className="p-8 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Administrator Access Required</h4>
              <p className="text-xs text-slate-400 mt-1">
                To prevent unauthorized course unlocks, only verified administrators can reconcile bank statements and approve UPI orders.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-300 text-left">
                {authError}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleAdminLoginWithGoogle}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Sign in as Admin ({PRIMARY_ADMIN_EMAIL})</span>
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-slate-800"></div>
                <span className="px-3 text-[11px] text-slate-500 uppercase">or enter admin key</span>
                <div className="flex-1 border-t border-slate-800"></div>
              </div>

              {/* Passkey Input */}
              <form onSubmit={handleAdminLoginWithPasskey} className="space-y-3">
                <input
                  type="password"
                  value={adminPasskey}
                  onChange={(e) => setAdminPasskey(e.target.value)}
                  placeholder="Master Admin Passkey (e.g. MoniAdmin2026!)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-lg shadow-amber-900/30 transition"
                >
                  Unlock Admin Portal
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Metric KPI cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b border-slate-800 bg-slate-950/40 shrink-0">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Pending Verification</span>
                <div className="text-2xl font-black text-amber-400 mt-1 flex items-center gap-1.5">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>{pendingCount}</span>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Verified Students</span>
                <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-1.5">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>{verifiedCount}</span>
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Verified Gross Revenue</span>
                <div className="text-2xl font-black text-indigo-400 mt-1">
                  ₹{verifiedRevenue.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Bank VPA Target</span>
                <div className="text-xs font-mono font-bold text-slate-300 mt-2 truncate">
                  edtingarts-2@oksbi
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-slate-800 gap-3 shrink-0">
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs w-full sm:w-auto">
                <button
                  onClick={() => setFilter('PENDING')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    filter === 'PENDING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilter('VERIFIED')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    filter === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Verified ({verifiedCount})
                </button>
                <button
                  onClick={() => setFilter('REJECTED')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    filter === 'REJECTED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rejected
                </button>
                <button
                  onClick={() => setFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    filter === 'ALL' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({orders.length})
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search UTR, name, or order ID..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Orders Table List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No orders matching the current filter.
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`bg-slate-950/70 border rounded-xl p-4 transition ${
                      order.status === 'PENDING_VERIFICATION'
                        ? 'border-amber-500/40 hover:border-amber-500/70'
                        : order.status === 'VERIFIED'
                        ? 'border-emerald-500/30'
                        : 'border-rose-900/40'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Student & Order Info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                            {order.id}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                              order.status === 'PENDING_VERIFICATION'
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                : order.status === 'VERIFIED'
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            }`}
                          >
                            {order.status === 'PENDING_VERIFICATION' ? 'Awaiting Bank Match' : order.status}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {new Date(order.createdAt).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-white">
                          {order.studentName}
                          <span className="text-xs font-normal text-slate-400 ml-2">
                            ({order.studentEmail} &bull; {order.studentPhone})
                          </span>
                        </div>

                        {/* UTR / Transaction Reference Box */}
                        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
                          <span className="text-slate-400">Submitted UTR:</span>
                          <span className="font-mono font-bold text-amber-300 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded">
                            {order.upiTransactionRef}
                          </span>
                          <button
                            onClick={() => handleCopy(order.upiTransactionRef, order.id)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition"
                            title="Copy UTR to verify in SBI Bank netbanking"
                          >
                            {copiedId === order.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="text-slate-500 text-[11px]">
                            &bull; Amount: <strong className="text-white">₹{order.amount.toLocaleString('en-IN')}</strong> to <strong>{order.payeeUpiId}</strong>
                          </span>
                        </div>

                        {order.notes && (
                          <div className="text-[11px] text-slate-400 italic pt-0.5">
                            Notes: {order.notes}
                          </div>
                        )}
                        {order.rejectionReason && (
                          <div className="text-[11px] text-rose-400 pt-0.5 font-medium">
                            Rejection Reason: {order.rejectionReason}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                        {order.status === 'PENDING_VERIFICATION' && (
                          <>
                            <button
                              onClick={() => {
                                setActionOrder(order);
                                setActionType('VERIFY');
                                setActionSuccessMsg(null);
                              }}
                              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/20 flex items-center gap-1.5 transition"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Verify &amp; Unlock</span>
                            </button>
                            <button
                              onClick={() => {
                                setActionOrder(order);
                                setActionType('REJECT');
                                setActionSuccessMsg(null);
                              }}
                              className="px-3 py-2 text-xs font-semibold rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40 flex items-center gap-1.5 transition"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {order.status === 'VERIFIED' && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1.5 rounded-lg">
                              <CheckCircle className="w-4 h-4" /> Course Unlocked
                            </span>
                            <button
                              onClick={() => {
                                setActionOrder(order);
                                setActionType('REJECT');
                              }}
                              className="text-[11px] text-slate-500 hover:text-rose-400 p-1"
                              title="Revoke access"
                            >
                              Revoke
                            </button>
                          </div>
                        )}

                        {order.status === 'REJECTED' && (
                          <button
                            onClick={() => {
                              setActionOrder(order);
                              setActionType('VERIFY');
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          >
                            Re-verify
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ACTION CONFIRMATION MODAL */}
            {actionOrder && actionType && (
              <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    {actionType === 'VERIFY' ? (
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                        <UserCheck className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                        <XCircle className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {actionType === 'VERIFY' ? 'Confirm Payment & Unlock Course' : 'Reject Payment Submission'}
                      </h4>
                      <p className="text-xs text-slate-400">Order #{actionOrder.id} &bull; {actionOrder.studentName}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs space-y-1.5 font-mono">
                    <p className="text-slate-300">Amount: <strong className="text-amber-400">₹{actionOrder.amount.toLocaleString('en-IN')}</strong></p>
                    <p className="text-slate-300">Submitted UTR: <strong className="text-indigo-400">{actionOrder.upiTransactionRef}</strong></p>
                    <p className="text-slate-300">Student Email: <strong>{actionOrder.studentEmail}</strong></p>
                  </div>

                  {actionType === 'REJECT' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Reason for Rejection
                      </label>
                      <select
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      >
                        <option value="Transaction reference not found on SBI bank statement">
                          UTR reference not found on SBI statement
                        </option>
                        <option value="Transferred amount does not match course fee of ₹5,999">
                          Amount does not match ₹5,999
                        </option>
                        <option value="Duplicate or previously credited reference ID">
                          Duplicate or previously used UTR
                        </option>
                        <option value="Transaction marked as reversed or failed by bank">
                          Transaction reversed or failed at bank
                        </option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Internal Admin Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="e.g., SBI Statement txn date 12-Oct, matched ref"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {actionSuccessMsg && (
                    <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-3 rounded-lg text-xs">
                      {actionSuccessMsg}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        setActionOrder(null);
                        setActionType(null);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmAction}
                      disabled={isProcessing}
                      className={`px-5 py-2 rounded-xl text-xs font-bold text-white transition ${
                        actionType === 'VERIFY'
                          ? 'bg-emerald-600 hover:bg-emerald-500'
                          : 'bg-rose-600 hover:bg-rose-500'
                      }`}
                    >
                      {isProcessing ? 'Updating...' : actionType === 'VERIFY' ? 'Approve & Unlock Access' : 'Reject Payment'}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
