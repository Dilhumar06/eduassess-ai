import React from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, MessageSquareQuote, FileText } from 'lucide-react';
import { Screen } from './Header';

interface MenuScreenProps {
  onSelectOption: (screen: 'quiz' | 'feedback' | 'reflection') => void;
  onBackHome: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onSelectOption, onBackHome }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Top bar back button */}
      <div className="mb-6">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Screen Title & Description */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Assessment Menu
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Select an assessment module below to explore prompt-generated course evaluation or examine AI-assisted student feedback.
        </p>
      </div>

      {/* Two Clear Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card A: AI-Generated Quiz */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-5">
              <HelpCircle className="w-5 h-5" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              AI-Generated Quiz
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              An 8-question multiple-choice assessment designed for university students, covering basic probability, independent events, conditional logic, and statistical distributions with immediate score feedback and full explanations.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              8 Questions · Multiple Choice
            </span>
            <button
              onClick={() => onSelectOption('quiz')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>Open</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card B: AI-Supported Feedback */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-5">
              <MessageSquareQuote className="w-5 h-5" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
              AI-Supported Feedback
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              A comparative evaluation examining how artificial intelligence analyzes student reasoning across four mastery tiers in conditional probability, coupled with human teacher moderation and review.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              4 Student Cases · Moderation Table
            </span>
            <button
              onClick={() => onSelectOption('feedback')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>Open</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Reflection Navigation Tile */}
      <div className="bg-slate-50/80 rounded-xl border border-slate-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Pedagogical Reflection
            </h3>
            <p className="text-xs text-slate-600">
              Reflections on AI capabilities, factual accuracy limitations, and the necessity of human verification.
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectOption('reflection')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors cursor-pointer shrink-0"
        >
          <span>Read Reflection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
