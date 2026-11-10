import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_PROMPT } from '../data/quizData';

type QuizStage = 'intro' | 'taking' | 'results';

interface QuizScreenProps {
  onBackToMenu: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onBackToMenu }) => {
  const [stage, setStage] = useState<QuizStage>('intro');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [promptExpanded, setPromptExpanded] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleStartQuiz = () => {
    setStage('taking');
    setCurrentIndex(0);
    setValidationError(null);
  };

  const handleSelectOption = (optionLabel: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionLabel,
    }));
    if (validationError) {
      setValidationError(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setValidationError(null);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setValidationError(null);
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const unansweredQuestionNumbers: number[] = [];
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (!answers[q.id]) {
        unansweredQuestionNumbers.push(idx + 1);
      }
    });

    if (unansweredQuestionNumbers.length > 0) {
      setValidationError(
        `Please answer all questions before submitting. Unanswered: Question ${unansweredQuestionNumbers.join(', Question ')}.`
      );
      return;
    }

    setValidationError(null);
    setStage('results');
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setValidationError(null);
    setStage('intro');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(QUIZ_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Calculations for results
  const correctCount = QUIZ_QUESTIONS.reduce((count, q) => {
    return answers[q.id] === q.correctAnswer ? count + 1 : count;
  }, 0);
  const incorrectCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getScoreFeedback = (score: number) => {
    if (score === 8) {
      return {
        rating: 'Mastery Level (8/8)',
        message: 'Outstanding performance! You have demonstrated exceptional mastery across sample spaces, independent events, conditional probabilities, and descriptive statistics.',
        color: 'text-sky-800 bg-sky-50 border-sky-200'
      };
    }
    if (score >= 6) {
      return {
        rating: 'Proficient Level (6-7/8)',
        message: 'Solid analytical comprehension! You have demonstrated a strong command of core probability rules and statistical measures with only minor conceptual review needed.',
        color: 'text-sky-800 bg-sky-50 border-sky-200'
      };
    }
    if (score >= 4) {
      return {
        rating: 'Developing Level (4-5/8)',
        message: 'Good foundational progress. You grasp basic arithmetic and single-event outcomes, but should review multi-stage experiments, without-replacement conditions, and combination formulas.',
        color: 'text-amber-800 bg-amber-50 border-amber-200'
      };
    }
    return {
      rating: 'Needs Review (0-3/8)',
      message: 'Comprehensive review recommended. Focus on constructing outcome trees, defining reduced sample spaces for conditional events, and differentiating between mean and median.',
      color: 'text-rose-800 bg-rose-50 border-rose-200'
    };
  };

  // -------------------------------------------------------------
  // VIEW 1: QUIZ INTRO SCREEN
  // -------------------------------------------------------------
  if (stage === 'intro') {
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

        {/* Intro Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Module 1 · Standardized Evaluation
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 mb-3">
              Probability and Statistics Quiz
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              This assessment tests core conceptual and calculation competencies in university-level probability and statistics. Questions were generated using a structured pedagogical prompt and vetted for formal mathematical precision.
            </p>
          </div>

          {/* Quiz Metadata Specs (clean unboxed text, no pills) */}
          <div className="border-y border-slate-100 py-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="block text-slate-500 font-medium">Academic Level</span>
              <span className="font-semibold text-slate-900">University Students</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Difficulty</span>
              <span className="font-semibold text-slate-900">Mixed (Beginner–Intermediate)</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Question Count</span>
              <span className="font-semibold text-slate-900">8 Questions</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium">Format</span>
              <span className="font-semibold text-slate-900">Multiple Choice (A, B, C, D)</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mb-8">
            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <span>Start Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Expandable Area: AI Prompt Used to Generate the Quiz */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/60">
            <button
              onClick={() => setPromptExpanded(!promptExpanded)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/70 transition-colors"
              aria-expanded={promptExpanded}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900">
                  AI Prompt Used to Generate the Quiz
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
                    Exact Prompt Specification
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
                  {QUIZ_PROMPT}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: QUIZ TAKING SCREEN (ONE QUESTION AT A TIME)
  // -------------------------------------------------------------
  if (stage === 'taking') {
    const isAnswered = !!answers[currentQuestion.id];
    const isLastQuestion = currentIndex === totalQuestions - 1;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Navigation back and header strip */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (
                Object.keys(answers).length === 0 ||
                window.confirm('Leave quiz? Your current answers will be preserved for this session.')
              ) {
                setStage('intro');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quiz Overview</span>
          </button>

          {/* Progress label (unboxed metadata) */}
          <div className="text-xs font-medium text-slate-500">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{Object.keys(answers).length} of {totalQuestions} Answered</span>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-sky-600 h-1.5 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Validation banner when submission blocked */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold block mb-1">Cannot Submit Quiz</span>
              <p>{validationError}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  if (!answers[q.id]) {
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setValidationError(null);
                        }}
                        className="px-2 py-1 bg-amber-200/70 hover:bg-amber-200 rounded text-xs font-semibold text-amber-900 cursor-pointer"
                      >
                        Jump to Q{idx + 1}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span className="font-semibold text-sky-700">Question {currentIndex + 1}</span>
            <span>{currentQuestion.topic}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
            {currentQuestion.question}
          </h2>

          {/* Four Options: A, B, C, D */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() => handleSelectOption(option.label)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 font-medium'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="text-sm font-medium">{option.text}</span>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-semibold text-sky-700">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Question Jump Strip */}
        <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-3 mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Jump to Question:</span>
            <span>{isAnswered ? 'Current question answered' : 'Current question awaiting answer'}</span>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const answered = !!answers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setValidationError(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-sky-600 bg-sky-600 text-white'
                      : answered
                      ? 'bg-sky-100 text-sky-800 hover:bg-sky-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  aria-label={`Go to Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom controls: Previous, Next, Submit */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              currentIndex === 0
                ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer shadow-xs"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
              >
                <span>Submit Quiz</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: QUIZ RESULTS SCREEN
  // -------------------------------------------------------------
  const feedback = getScoreFeedback(correctCount);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={onBackToMenu}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Assessment Menu</span>
        </button>
      </div>

      {/* Summary Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-sky-700">
            Assessment Complete
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 mb-4">
            Quiz Results & Diagnostic Feedback
          </h1>

          {/* Big Score Callout */}
          <div className="my-6 inline-flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
              {correctCount} <span className="text-slate-400 text-2xl font-normal">/ {totalQuestions}</span>
            </div>
            <div className="text-base font-semibold text-sky-700 mt-1 font-mono tabular-nums">
              {percentage}% Overall Score
            </div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-3">
              <span className="text-emerald-700 font-semibold">{correctCount} Correct</span>
              <span>·</span>
              <span className="text-slate-600 font-medium">{incorrectCount} Incorrect</span>
            </div>
          </div>

          {/* Performance Feedback */}
          <div className={`p-4 rounded-xl border text-left ${feedback.color}`}>
            <span className="block font-bold text-sm mb-1">{feedback.rating}</span>
            <p className="text-xs sm:text-sm leading-relaxed">{feedback.message}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-100">
          <button
            onClick={handleResetQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <button
            onClick={onBackToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>Return to Assessment Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Itemized Review of all 8 Questions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Detailed Question Breakdown
          </h2>
          <span className="text-xs text-slate-500">
            {correctCount} of 8 answered correctly
          </span>
        </div>

        {QUIZ_QUESTIONS.map((q, index) => {
          const studentChoice = answers[q.id];
          const isCorrect = studentChoice === q.correctAnswer;
          const correctOption = q.options.find((o) => o.label === q.correctAnswer);
          const studentOption = q.options.find((o) => o.label === studentChoice);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border p-5 sm:p-6 shadow-xs ${
                isCorrect ? 'border-emerald-200' : 'border-rose-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                    <span>Question {index + 1}</span>
                    <span>·</span>
                    <span>{q.topic}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {q.question}
                  </h3>
                </div>

                {/* Status indicator */}
                <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold">
                  {isCorrect ? (
                    <span className="text-emerald-700 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Correct
                    </span>
                  ) : (
                    <span className="text-rose-700 inline-flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Incorrect
                    </span>
                  )}
                </div>
              </div>

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-xs">
                <div
                  className={`p-3 rounded-lg border ${
                    isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-200 text-rose-950'
                  }`}
                >
                  <span className="block font-semibold text-slate-500 mb-1">
                    Your Selected Answer
                  </span>
                  <div className="font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-white border border-current flex items-center justify-center text-xs">
                      {studentChoice || 'None'}
                    </span>
                    <span>{studentOption?.text || 'No answer submitted'}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border bg-sky-50/70 border-sky-200 text-sky-950">
                  <span className="block font-semibold text-slate-500 mb-1">
                    Correct Answer
                  </span>
                  <div className="font-bold flex items-center gap-2 text-sky-900">
                    <span className="w-5 h-5 rounded bg-sky-600 text-white flex items-center justify-center text-xs">
                      {q.correctAnswer}
                    </span>
                    <span>{correctOption?.text}</span>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 text-xs">
                <span className="font-semibold text-slate-700 block mb-1">
                  Mathematical Explanation:
                </span>
                <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
