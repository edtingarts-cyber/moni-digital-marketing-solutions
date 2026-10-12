import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { MONI_COURSE } from '../data/courseData.ts';

interface CurriculumSectionProps {
  onOpenCheckout: () => void;
  onOpenStudentPortal: () => void;
  hasVerifiedAccess: boolean;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  onOpenCheckout,
  onOpenStudentPortal,
  hasVerifiedAccess,
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string>('mod-1');

  const toggleModule = (id: string) => {
    setExpandedModuleId(expandedModuleId === id ? '' : id);
  };

  return (
    <section id="curriculum-section" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Comprehensive Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            8 Modules Engineered for Rapid Mastery
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            From algorithmic Meta/Google Ads to AI SEO and high-ticket agency sales. Everything you need to command top-tier marketing retainers.
          </p>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-3">
          {MONI_COURSE.modules.map((mod, index) => {
            const isExpanded = expandedModuleId === mod.id;
            return (
              <div
                key={mod.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                {/* Header */}
                <div
                  onClick={() => toggleModule(mod.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">{mod.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{mod.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {mod.duration}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Lessons */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/50 p-4 divide-y divide-slate-800/60">
                    {mod.lessons.map((les) => (
                      <div key={les.id} className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {les.type === 'video' ? (
                              <PlayCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                            )}
                            <span className="text-sm font-semibold text-slate-200">{les.title}</span>
                            {les.isFreePreview && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Free Preview
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                            {les.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pl-6 sm:pl-0 shrink-0">
                          <span className="text-xs text-slate-500 font-mono">{les.duration}</span>
                          {hasVerifiedAccess ? (
                            <button
                              onClick={onOpenStudentPortal}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 rounded-md border border-emerald-500/30 flex items-center gap-1"
                            >
                              <PlayCircle className="w-3 h-3" /> Play
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-600" />
                              Locked
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-indigo-500/30 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white">Ready to unlock all 8 modules &amp; agency frameworks?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Enroll today for ₹5,999 with zero processing fee. Direct UPI transfer to <strong>edtingarts-2@oksbi</strong> with admin bank verification.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenCheckout}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
            >
              Enroll with UPI &bull; ₹5,999
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
