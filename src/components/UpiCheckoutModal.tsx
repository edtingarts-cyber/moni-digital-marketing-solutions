import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Smartphone,
  Clock,
  ArrowRight,
  Send,
  HelpCircle,
  ChevronDown,
  Phone,
  MessageCircle
} from 'lucide-react';
import { ALL_PRODUCTS, MONI_COURSE } from '../data/courseData.ts';
import { createOrder } from '../services/orderStorage.ts';
import { Course, Order } from '../types/index.ts';

interface UpiCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (order: Order) => void;
  onOpenTrackOrder: () => void;
  initialProduct?: Course;
}

export const UpiCheckoutModal: React.FC<UpiCheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCreated,
  onOpenTrackOrder,
  initialProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Course>(initialProduct || MONI_COURSE);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Form inputs
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [upiTransactionRef, setUpiTransactionRef] = useState('');
  const [paymentAppUsed, setPaymentAppUsed] = useState('Google Pay');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  // Update selected product when modal opens or initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, [initialProduct, isOpen]);

  const payeeUpiId = selectedProduct.payeeUpiId || 'edtingarts-2@oksbi';
  const coursePrice = selectedProduct.price;
  const formattedPrice = `₹${coursePrice.toLocaleString('en-IN')}`;

  // Valid NPCI UPI Payment URI with dynamic product name and exact price
  const cleanTitle = selectedProduct.title.replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 25);
  const upiUri = `upi://pay?pa=${encodeURIComponent(payeeUpiId)}&pn=${encodeURIComponent('Moni Digital Marketing')}&am=${coursePrice.toFixed(2)}&cu=INR&tn=${encodeURIComponent(cleanTitle)}`;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(upiUri, {
        width: 280,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('Failed to generate QR code', err));
    }
  }, [isOpen, upiUri, selectedProduct]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(payeeUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(coursePrice.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = createOrder({
        studentName,
        studentEmail,
        studentPhone,
        courseId: selectedProduct.id,
        courseTitle: selectedProduct.title,
        amount: coursePrice,
        payeeUpiId,
        upiTransactionRef,
      });

      if (!res.success || !res.order) {
        setErrorMsg(res.error || 'Failed to submit payment details. Please check your entries.');
        setIsSubmitting(false);
        return;
      }

      setSubmittedOrder(res.order);
      onOrderCreated(res.order);
      setActiveStep(3);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('An unexpected error occurred while saving your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Direct UPI Checkout</h3>
              <p className="text-xs text-slate-400">Zero Gateway Surcharge &bull; Payee: <span className="font-mono text-slate-300">edtingarts-2@oksbi</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Selector Dropdown if on Step 1 */}
        {activeStep === 1 && (
          <div className="px-6 pt-4 pb-1 bg-slate-950/40 border-b border-slate-800/80">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Selected Item / Switch Offering:
            </label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const found = ALL_PRODUCTS.find((p) => p.id === e.target.value);
                if (found) setSelectedProduct(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {ALL_PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.title} — ₹{prod.price.toLocaleString('en-IN')}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Progress Step Indicator */}
        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/60 text-xs text-center font-medium">
          <div
            className={`py-2.5 px-3 border-r border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeStep === 1 ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-400'
            }`}
            onClick={() => activeStep !== 3 && setActiveStep(1)}
          >
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">1</span>
            <span>Scan &amp; Pay</span>
          </div>
          <div
            className={`py-2.5 px-3 border-r border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeStep === 2 ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-400'
            }`}
            onClick={() => activeStep !== 3 && setActiveStep(2)}
          >
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">2</span>
            <span>Submit Reference</span>
          </div>
          <div
            className={`py-2.5 px-3 flex items-center justify-center gap-1.5 ${
              activeStep === 3 ? 'text-amber-400 bg-amber-500/10 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">3</span>
            <span>Pending Review</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* STEP 1: SCAN & PAY */}
          {activeStep === 1 && (
            <div className="space-y-6">
              {/* Dynamic Price Banner */}
              <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-indigo-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    {selectedProduct.category || 'Product Checkout'}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{selectedProduct.title}</h4>
                  <p className="text-xs text-slate-400">{selectedProduct.tagline}</p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] text-slate-400 block line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <div className="text-2xl font-black text-amber-400 flex items-center sm:justify-end gap-1">
                    {formattedPrice}
                    <button
                      onClick={handleCopyAmount}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Copy Amount"
                    >
                      {copiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Calculated Dynamic Price
                  </span>
                </div>
              </div>

              {/* Payee UPI Information Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Payee UPI ID</span>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> State Bank of India
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-indigo-400" />
                    <span className="font-mono text-base font-bold text-white tracking-wide">{payeeUpiId}</span>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-md border border-indigo-500/30 transition"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code and App Intents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-slate-200 text-slate-900 text-center">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="UPI Payment QR Code" className="w-48 h-48 object-contain" />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center text-slate-400">Generating QR...</div>
                  )}
                  <p className="text-xs font-bold text-slate-800 mt-2">Scan &amp; Transfer {formattedPrice}</p>
                  <p className="text-[11px] text-slate-500">Google Pay &bull; PhonePe &bull; Paytm &bull; BHIM</p>
                </div>

                {/* Direct App Launch Button & Instructions */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-white">Direct Mobile UPI Transfer</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tap below to launch your UPI app with payee ID ({payeeUpiId}) and exact item price ({formattedPrice}) auto-filled.
                    </p>
                  </div>

                  {/* Clear Pay with UPI Button */}
                  <a
                    href={upiUri}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 transition transform hover:-translate-y-0.5 text-center"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Pay with UPI ({formattedPrice})</span>
                  </a>

                  <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-xs text-slate-400 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Next Step:</strong> Once payment succeeds in your UPI app, copy the 12-digit UPI UTR reference number from the receipt.</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStep(2)}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition"
                  >
                    <span>I Have Transferred &rarr; Enter Reference ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Enquiry helpline */}
                  <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Phone className="w-3 h-3 text-amber-400" />
                      Payment Enquiry:
                    </span>
                    <div className="flex items-center gap-2 font-mono">
                      <a href="tel:+917368066550" className="text-amber-300 hover:underline">7368066550</a>
                      <span>&bull;</span>
                      <a href="tel:+916287756485" className="text-amber-300 hover:underline">6287756485</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SUBMIT TRANSACTION REFERENCE ID */}
          {activeStep === 2 && (
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3.5 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-200">
                  <p className="font-bold text-white mb-0.5">Where do I find the UPI Reference / UTR Number?</p>
                  In your UPI app receipt (Google Pay, PhonePe, Paytm, or BHIM), locate the 12-digit <strong>UPI Transaction ID</strong> or <strong>Bank Reference / UTR No.</strong> (e.g., <code>410293847561</code>).
                </div>
              </div>

              {errorMsg && (
                <div className="bg-rose-950/50 border border-rose-800/50 rounded-xl p-3.5 flex items-start gap-3 text-xs text-rose-200">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>{errorMsg}</div>
                </div>
              )}

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs flex justify-between items-center font-mono">
                <span className="text-slate-400">Item: <strong className="text-white">{selectedProduct.title}</strong></span>
                <span className="text-amber-400 font-bold">{formattedPrice}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student / Customer Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g., Ananya Deshmukh"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile / WhatsApp Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Payment App Used
                  </label>
                  <select
                    value={paymentAppUsed}
                    onChange={(e) => setPaymentAppUsed(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Google Pay">Google Pay</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Paytm">Paytm</option>
                    <option value="BHIM UPI">BHIM UPI</option>
                    <option value="CRED">CRED</option>
                    <option value="Other Bank App">Other Bank App</option>
                  </select>
                </div>
              </div>

              {/* UTR / Transaction Reference ID Field */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1 flex items-center justify-between">
                  <span>12-Digit UPI Transaction ID / UTR <span className="text-rose-400">*</span></span>
                  <span className="text-[11px] text-slate-400">Strictly verified against SBI account</span>
                </label>
                <input
                  type="text"
                  required
                  value={upiTransactionRef}
                  onChange={(e) => setUpiTransactionRef(e.target.value)}
                  placeholder="e.g., 410293847561"
                  className="w-full bg-slate-950 border border-amber-500/40 rounded-lg px-3.5 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              {/* MANDATORY SECURITY POLICY NOTICE */}
              <div className="bg-amber-950/30 border border-amber-600/40 rounded-xl p-3.5 text-xs text-amber-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Mandatory Security Protocol: Order Remains PENDING Until Verified
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  Submitting this reference places your order in <strong>PENDING ADMIN VERIFICATION</strong> status. Payment is never assumed succeeded simply by clicking pay or submitting a reference ID. Full access to {selectedProduct.title} unlocks strictly once our finance administrator reconciles the transaction with our SBI bank statement.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
                >
                  &larr; Back to QR Code
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Register Reference for Verification'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUBMITTED & PENDING VERIFICATION */}
          {activeStep === 3 && submittedOrder && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Clock className="w-9 h-9 animate-pulse" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-2">
                  Status: PENDING ADMIN VERIFICATION
                </span>
                <h4 className="text-xl font-extrabold text-white">Payment Submission Recorded</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Thank you, <strong>{submittedOrder.studentName}</strong>. Your payment reference for <strong>{submittedOrder.courseTitle}</strong> has been queued for bank reconciliation.
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="text-white font-bold">{submittedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Product:</span>
                  <span className="text-indigo-300 truncate max-w-[200px]">{submittedOrder.courseTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Payee UPI ID:</span>
                  <span className="text-white">{submittedOrder.payeeUpiId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Exact Amount:</span>
                  <span className="text-amber-400 font-bold">₹{submittedOrder.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="text-slate-400">Submitted UTR Ref:</span>
                  <span className="text-indigo-400 font-bold">{submittedOrder.upiTransactionRef}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Access Status:</span>
                  <span className="text-amber-400 font-bold">LOCKED (Pending SBI Bank Match)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTrackOrder();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Track Live Order Status</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
