import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Screen } from './Header';

interface HomeScreenProps {
  onStart: () => void;
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Main Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 md:p-16 shadow-xs text-center">
        {/* Academic context kicker */}
        <p className="text-xs uppercase tracking-wider font-semibold text-sky-700 mb-3">
          University Probability & Statistics
        </p>

        {/* Website Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
          EduAssess AI
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl font-semibold text-sky-600 mb-6">
          Smart Assessment. Meaningful Feedback.
        </p>

        {/* One short sentence explaining the platform */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-10">
          An AI-supported assessment platform demonstrating how intelligent tools assist instructors in generating targeted probability quizzes, evaluating multi-tier student responses, and delivering calibrated feedback.
        </p>

        {/* One Main Button: Get Started */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Subtle structural highlight indicators (no pills, anti-slop) */}
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Prompt-Driven Quizzes</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated multiple-choice questions spanning sample spaces, independent events, and conditional distributions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Multi-Level Feedback</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Granular AI evaluations tailored across excellent, good, developing, and misconception response profiles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Human Oversight</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instructor moderation ensures mathematical rigor, eliminates hallucinations, and sharpens learning outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
