import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { REFLECTION_CONTENT } from '../data/reflectionData';

interface ReflectionScreenProps {
  onBackToMenu: () => void;
}

export const ReflectionScreen: React.FC<ReflectionScreenProps> = ({ onBackToMenu }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment Menu</span>
        </button>
      </div>

      {/* Main Reflection Document Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Pedagogical Analysis</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-8">
          {REFLECTION_CONTENT.title}
        </h1>

        {/* Exact Reflection Text Paragraphs */}
        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          {REFLECTION_CONTENT.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-justify sm:text-left">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Structured Takeaways (Clean, no pills) */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Core Insights from Implementation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 mb-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>AI Efficiency</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamlines initial quiz drafting and multi-tier feedback generation for differentiated student levels.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Limitations</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Plausible but erroneous answer keys and generic phrasing necessitate strict teacher-level verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Teacher as Pilot</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                AI operates as an instructional assistant, keeping educators at the core of assessment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
