import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Bot,
  UserCheck,
  FileSpreadsheet,
  Layers,
  HelpCircle
} from 'lucide-react';
import {
  FEEDBACK_QUESTION,
  FEEDBACK_AI_PROMPT,
  STUDENT_PROFILES
} from '../data/feedbackData';

interface FeedbackScreenProps {
  onBackToMenu: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onBackToMenu }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(STUDENT_PROFILES[0].id);
  const [promptExpanded, setPromptExpanded] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'profile' | 'compare'>('profile');

  const selectedStudent =
    STUDENT_PROFILES.find((s) => s.id === selectedStudentId) || STUDENT_PROFILES[0];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(FEEDBACK_AI_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Top back button */}
      <div className="mb-6">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment Menu</span>
        </button>
      </div>

      {/* Screen Title & Academic Context */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Module 2 · Formative Evaluation & Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 mb-2">
          AI-Supported Feedback Evaluation
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Demonstrating prepared AI evaluation of diverse student reasoning on conditional probability, paired with instructor verification to ensure pedagogical precision.
        </p>
      </div>

      {/* Benchmark Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Benchmark Probability Question</span>
        </div>

        <p className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-relaxed">
          "{FEEDBACK_QUESTION.text}"
        </p>

        <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-500 font-medium">Standard Correct Answer: </span>
            <span className="font-mono font-bold text-sky-900 text-sm">
              {FEEDBACK_QUESTION.correctAnswer}
            </span>
          </div>
          <div className="text-slate-600">
            <span className="font-semibold text-slate-700">Mathematical Rationale: </span>
            <span>{FEEDBACK_QUESTION.mathematicalBreakdown}</span>
          </div>
        </div>
      </div>

      {/* Expandable Area: AI Prompt Used for Feedback */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/70 mb-8">
        <button
          onClick={() => setPromptExpanded(!promptExpanded)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/70 transition-colors"
          aria-expanded={promptExpanded}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-900">
              AI Prompt Used for Feedback
            </span>
            <span className="text-xs text-slate-500">
              {promptExpanded ? '(Click to collapse)' : '(Click to inspect prompt)'}
            </span>
          </div>
          <div className="text-slate-500">
            {promptExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {promptExpanded && (
          <div className="px-5 py-4 border-t border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">
                Evaluation Prompt Template
              </span>
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1 text-xs text-sky-700 hover:text-sky-800 cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200/80 font-mono whitespace-pre-wrap leading-relaxed">
              {FEEDBACK_AI_PROMPT}
            </pre>
          </div>
        )}
      </div>

      {/* View Mode Toggle: Profile Deep-Dive vs Full Comparative Table */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Student Answer Analysis & Moderation
          </h2>
          <p className="text-xs text-slate-500">
            Compare four distinct comprehension levels: Excellent, Good, Needs Improvement, and Incorrect.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setViewMode('profile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              viewMode === 'profile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Profile View</span>
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              viewMode === 'compare'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Summary Table</span>
          </button>
        </div>
      </div>

      {/* 4 Selectable Student Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {STUDENT_PROFILES.map((profile) => {
          const isSelected = profile.id === selectedStudentId;
          return (
            <button
              key={profile.id}
              onClick={() => {
                setSelectedStudentId(profile.id);
                setViewMode('profile');
              }}
              className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-sky-600 bg-sky-50/80 shadow-xs ring-1 ring-sky-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="text-xs font-bold text-slate-900">
                {profile.name}
              </div>
              <div className="text-xs font-medium text-sky-700 mt-0.5">
                {profile.performanceTier}
              </div>
            </button>
          );
        })}
      </div>

      {/* Profile Deep-Dive View */}
      {viewMode === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-6">
          {/* Header of selected student */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedStudent.name} — {selectedStudent.performanceTier}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedStudent.evaluationSummary}
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-700">
              Verdict: <span className="text-sky-800">{selectedStudent.verdict}</span>
            </div>
          </div>

          {/* 1. Student Submitted Answer */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Student Submitted Answer
            </span>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 italic font-medium leading-relaxed">
              "{selectedStudent.studentAnswer}"
            </div>
          </div>

          {/* 2. AI Generated Feedback */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-800 mb-2">
              <Bot className="w-4 h-4 text-sky-600" />
              <span>2. AI Feedback (Automated Response)</span>
            </div>
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 text-sm text-slate-900 leading-relaxed">
              {selectedStudent.aiFeedback}
            </div>
          </div>

          {/* 3. Human Teacher Review */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>3. Human Teacher Review (Instructor Moderation)</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-sm text-slate-900 leading-relaxed">
              <span className="font-semibold text-emerald-950">Review Outcome: </span>
              {selectedStudent.humanReview}
            </div>
          </div>

          {/* Key Pedagogical Takeaway */}
          <div className="pt-2 text-xs text-slate-600 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-800">Pedagogical Note: </span>
            {selectedStudent.keyLearningPoint}
          </div>
        </div>
      )}

      {/* Human Review Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileSpreadsheet className="w-4 h-4 text-sky-700" />
          <h3 className="text-base font-bold text-slate-900">
            Human Review & Moderation Summary Table
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Summarizing the AI evaluations against teacher verifications across all four student submissions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                <th className="py-3 px-3">Student & Tier</th>
                <th className="py-3 px-3">Student Answer</th>
                <th className="py-3 px-3">AI Feedback Assessment</th>
                <th className="py-3 px-3">Teacher Review & Clarification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STUDENT_PROFILES.map((profile) => (
                <tr
                  key={profile.id}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    selectedStudentId === profile.id ? 'bg-sky-50/30' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 align-top font-bold text-slate-900 whitespace-nowrap">
                    <div>{profile.name}</div>
                    <div className="text-sky-700 font-medium text-[11px]">
                      {profile.performanceTier}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 align-top text-slate-700 max-w-xs leading-relaxed italic">
                    "{profile.studentAnswer}"
                  </td>
                  <td className="py-3.5 px-3 align-top text-slate-700 max-w-sm leading-relaxed">
                    {profile.aiFeedback}
                  </td>
                  <td className="py-3.5 px-3 align-top text-slate-800 font-medium max-w-xs leading-relaxed">
                    {profile.humanReview}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Required Disclaimer & Pedagogical Framing */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 leading-relaxed text-center">
        <span className="font-semibold text-slate-800">Platform Demonstration Notice: </span>
        This module displays prepared, educator-moderated AI feedback developed using structured prompt templates. It demonstrates how AI assists teachers in standardizing rubric feedback while reinforcing the imperative of human review.
      </div>
    </div>
  );
};
