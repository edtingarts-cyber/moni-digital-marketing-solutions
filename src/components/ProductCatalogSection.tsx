import React from 'react';
import {
  CheckCircle2,
  Smartphone,
  QrCode,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Globe,
  Share2,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import {
  GOOGLE_ADS_COURSE,
  SHOPSHFLY_PRODUCT,
  MEASSO_PRODUCT,
  THREE_PRODUCTS_BUNDLE,
  MONI_COURSE
} from '../data/courseData.ts';
import { Course } from '../types/index.ts';

interface ProductCatalogSectionProps {
  onSelectProductToCheckout: (product: Course) => void;
  onOpenTrackOrder: () => void;
}

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  onSelectProductToCheckout,
  onOpenTrackOrder,
}) => {
  const newProducts = [
    {
      course: GOOGLE_ADS_COURSE,
      icon: TrendingUp,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/40',
      tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      priceBadge: 'text-amber-400',
    },
    {
      course: SHOPSHFLY_PRODUCT,
      icon: Globe,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/40',
      tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      priceBadge: 'text-emerald-400',
    },
    {
      course: MEASSO_PRODUCT,
      icon: Share2,
      color: 'from-purple-500/20 to-indigo-500/10',
      border: 'border-purple-500/40',
      tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      priceBadge: 'text-purple-400',
    },
  ];

  return (
    <section id="products-catalog" className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Specialized Courses &amp; Turnkey Systems
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            High-Converting Growth Programs &amp; Business Blueprints
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Choose an individual program or complete business setup. Dynamic UPI checkout to payee <strong className="text-slate-200">edtingarts-2@oksbi</strong> with admin verification.
          </p>
        </div>

        {/* 3 New Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newProducts.map(({ course, icon: Icon, border, tagColor, priceBadge }, idx) => (
            <div
              key={course.id}
              className={`bg-slate-900/80 border ${border} rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-600 transition`}
            >
              {/* Top Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${tagColor}`}>
                    {course.badge || `Product 0${idx + 1}`}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white leading-snug">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{course.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-3 border-y border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block line-through">
                      ₹{course.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <div className={`text-3xl font-black ${priceBadge}`}>
                      ₹{course.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    Payee: edtingarts-2@oksbi
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-2 text-xs text-slate-300">
                  {course.features?.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2">
                <button
                  onClick={() => onSelectProductToCheckout(course)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-amber-300" />
                  <span>Buy Now — ₹{course.price.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Pending admin bank reconciliation
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 3-PRODUCT FAST-TRACK BUNDLE CARD: Total ₹3,398 */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/60 via-indigo-950/50 to-purple-950/60 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-indigo-500/10 w-96 h-96 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  All 3 Items Bundle &bull; Save Big
                </span>
                <span className="text-xs text-slate-400">Total Calculation: ₹1,400 + ₹999 + ₹999</span>
              </div>
              <h3 className="text-2xl font-black text-white">{THREE_PRODUCTS_BUNDLE.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Get the <strong>Google Ads Course (₹1,400)</strong>, <strong>Shopshfly Website (₹999)</strong>, and <strong>Measso Online Selling Business (₹999)</strong> together for the exact total sum of <strong>₹3,398</strong>. One payment, all 3 programs unlocked.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 font-mono">
                <span className="text-emerald-400">&bull; Google Ads: ₹1,400</span>
                <span className="text-indigo-400">&bull; Shopshfly: ₹999</span>
                <span className="text-purple-400">&bull; Measso: ₹999</span>
                <span className="text-amber-400 font-bold">&bull; Exact Total: ₹3,398</span>
              </div>
            </div>

            <div className="text-left lg:text-right shrink-0 space-y-3">
              <div>
                <span className="text-xs text-slate-500 line-through block">₹9,497 Total Value</span>
                <div className="text-4xl font-black text-amber-400">₹3,398</div>
                <span className="text-[11px] text-emerald-400 font-semibold">Exact combined sum</span>
              </div>
              <button
                onClick={() => onSelectProductToCheckout(THREE_PRODUCTS_BUNDLE)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-orange-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-xl shadow-amber-900/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-5 h-5 text-white" />
                <span>Buy All 3 Bundle — ₹3,398</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
