import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Lock,
  CheckCircle2,
  PlayCircle,
  FileText,
  Download,
  Award,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { MONI_COURSE, ALL_PRODUCTS } from '../data/courseData.ts';
import { CourseModule, Lesson, Course } from '../types/index.ts';
import { getStoredOrders, getActiveStudentOrderId } from '../services/orderStorage.ts';

interface StudentPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
  onOpenTrackOrder: () => void;
  verifiedEmailOrId: string | null;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
  onOpenTrackOrder,
  verifiedEmailOrId,
}) => {
  const activeOrderId = getActiveStudentOrderId();
  const allOrders = getStoredOrders();

  // Find verified order
  const verifiedOrder = allOrders.find(
    (o) =>
      o.status === 'VERIFIED' &&
      (o.id === verifiedEmailOrId ||
        o.studentEmail.toLowerCase() === verifiedEmailOrId?.toLowerCase() ||
        o.id === activeOrderId ||
        o.studentEmail.toLowerCase() === activeOrderId?.toLowerCase())
  );

  const hasAccess = Boolean(verifiedOrder);

  // Match the verified product/course
  const verifiedCourse: Course =
    ALL_PRODUCTS.find((p) => p.id === verifiedOrder?.courseId) || MONI_COURSE;

  // Lesson player state
  const [selectedModule, setSelectedModule] = useState<CourseModule>(verifiedCourse.modules[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(verifiedCourse.modules[0].lessons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['l-1-1']);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Sync module/lesson when verifiedCourse changes
  useEffect(() => {
    if (verifiedCourse && verifiedCourse.modules.length > 0) {
      setSelectedModule(verifiedCourse.modules[0]);
      if (verifiedCourse.modules[0].lessons.length > 0) {
        setSelectedLesson(verifiedCourse.modules[0].lessons[0]);
      }
    }
  }, [verifiedCourse.id]);

  if (!isOpen) return null;

  const toggleLessonComplete = (id: string) => {
    if (completedLessonIds.includes(id)) {
      setCompletedLessonIds(completedLessonIds.filter((item) => item !== id));
    } else {
      setCompletedLessonIds([...completedLessonIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-6xl w-full shadow-2xl overflow-hidden text-slate-100 max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Student Learning Portal</h3>
                {hasAccess ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Payment Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Access Locked
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {verifiedCourse.title} &bull; {verifiedCourse.totalDuration}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOCKED GATE IF PAYMENT IS NOT VERIFIED */}
        {!hasAccess ? (
          <div className="p-8 max-w-lg mx-auto w-full my-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-950/40">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-white">Course Materials Locked</h4>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                As per Moni Digital Marketing Solutions policy, access is restricted until payment of <strong className="text-amber-400">₹5,999</strong> to payee <code className="text-slate-200">edtingarts-2@oksbi</code> is verified against our bank statement.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-left space-y-2 text-slate-400">
              <div className="flex items-center gap-2 font-semibold text-slate-200">
                <Lock className="w-4 h-4 text-amber-400" />
                Why is the course locked?
              </div>
              <p>
                1. Simply clicking "Pay" or entering an unverified reference number will not grant course access.
              </p>
              <p>
                2. If you already submitted your 12-digit UPI UTR, your order is currently <strong>PENDING ADMIN VERIFICATION</strong>.
              </p>
              <p>
                3. Our team reconciles incoming credits with SBI before unlocking the modules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenTrackOrder();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <span>Track My UTR / Order Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
              >
                Enroll Now with UPI (₹5,999)
              </button>
            </div>
          </div>
        ) : (
          /* UNLOCKED FULL COURSE EXPERIENCE */
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            
            {/* Left: Video Player and Lesson Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Simulated Video Player */}
              <div className="relative aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-4 group">
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-indigo-400 border border-slate-700">
                    {selectedModule.title.split(':')[0]}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-800/40">
                    HD 1080p &bull; Enrolled Student: {verifiedOrder?.studentName}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="text-center my-auto z-10">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 mx-auto transition transform hover:scale-105"
                  >
                    <PlayCircle className="w-9 h-9 ml-0.5" />
                  </button>
                  <p className="text-sm font-bold text-white mt-3 drop-shadow">
                    {isPlaying ? 'Streaming Active Video Feed' : `Click to Play: ${selectedLesson.title}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Duration: {selectedLesson.duration}
                  </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span>Moni Digital Marketing Solutions Masterclass</span>
                  <button
                    onClick={() => toggleLessonComplete(selectedLesson.id)}
                    className={`font-semibold transition flex items-center gap-1 ${
                      completedLessonIds.includes(selectedLesson.id)
                        ? 'text-emerald-400'
                        : 'text-indigo-400 hover:text-indigo-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{completedLessonIds.includes(selectedLesson.id) ? 'Completed' : 'Mark as Complete'}</span>
                  </button>
                </div>
              </div>

              {/* Lesson Details */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedLesson.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedModule.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedLesson.resourceDownloadName && (
                      <button
                        onClick={() => alert(`Downloaded ${selectedLesson.resourceDownloadName}`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30 flex items-center gap-1.5 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Resources</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowCertificateModal(true)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 flex items-center gap-1.5 transition"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificate</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lesson Overview &amp; Implementation</h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    {selectedLesson.description}
                  </p>

                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pt-2">Key Actionable Takeaways</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {selectedLesson.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Modules & Lessons Navigation Sidebar */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/50 flex flex-col shrink-0">
              <div className="p-4 border-b border-slate-800 bg-slate-950/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-white">Course Curriculum</span>
                  <span className="text-slate-400 font-mono">
                    {completedLessonIds.length} / 16 Lessons
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((completedLessonIds.length / 16) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {verifiedCourse.modules.map((mod) => (
                  <div key={mod.id} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                    <div
                      onClick={() => setSelectedModule(mod)}
                      className={`p-3 cursor-pointer text-xs font-semibold flex items-center justify-between transition ${
                        selectedModule.id === mod.id ? 'bg-indigo-600/15 text-indigo-300' : 'text-slate-300 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="truncate pr-2 font-bold">{mod.title}</div>
                      <span className="text-[10px] text-slate-400 shrink-0">{mod.duration}</span>
                    </div>

                    {/* Lessons list */}
                    <div className="divide-y divide-slate-800/60 bg-slate-950/40">
                      {mod.lessons.map((les) => {
                        const isCurrent = selectedLesson.id === les.id;
                        const isDone = completedLessonIds.includes(les.id);
                        return (
                          <div
                            key={les.id}
                            onClick={() => {
                              setSelectedModule(mod);
                              setSelectedLesson(les);
                            }}
                            className={`p-2.5 pl-4 text-xs cursor-pointer flex items-center justify-between transition ${
                              isCurrent
                                ? 'bg-indigo-500/20 text-white font-medium border-l-2 border-indigo-500'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <PlayCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              )}
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 shrink-0 ml-2">{les.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Certificate Modal */}
        {showCertificateModal && verifiedOrder && (
          <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-8 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Award className="w-9 h-9" />
              </div>

              <div className="border-2 border-dashed border-amber-500/40 bg-slate-950 p-6 rounded-xl space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">CERTIFICATE OF COMPLETION</p>
                <h3 className="text-2xl font-black text-white">{verifiedOrder.studentName}</h3>
                <p className="text-xs text-slate-300">
                  has successfully satisfied all rigorous practical requirements for the program:
                </p>
                <h4 className="text-base font-bold text-indigo-300">{MONI_COURSE.title}</h4>
                <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800 flex justify-between">
                  <span>Verification ID: {verifiedOrder.id}</span>
                  <span>Issued by: Moni Digital Marketing Solutions</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => alert('Certificate downloaded as PDF!')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
