'use client';

import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { useAppStore } from '../../lib/store';

export const QuizEngine: React.FC = () => {
  const {
    selectedQuizId,
    quizzes,
    submitQuizAttempt,
    setCurrentView,
    openLesson,
  } = useAppStore();

  const quiz = quizzes.find((q) => q.id === selectedQuizId) || quizzes[0];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(quiz.durationMinutes * 60);

  useEffect(() => {
    if (isSubmitted || secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, secondsRemaining]);

  const currentQuestion = quiz.questions[currentQIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQIndex]: optIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        score += 2; // 2 marks per question (total 10)
      }
    });

    const timeSpent = quiz.durationMinutes * 60 - secondsRemaining;
    submitQuizAttempt(quiz.id, score, quiz.totalMarks, timeSpent);
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        score += 2;
        correctCount += 1;
      }
    });
    return { score, correctCount };
  };

  const { score, correctCount } = calculateScore();
  const percentage = Math.round((score / quiz.totalMarks) * 100);
  const isPassed = score >= quiz.passingMarks;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('quizzes')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Quizzes
        </button>
        {!isSubmitted && (
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-full font-mono text-xs font-bold border border-slate-800 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-edexora-yellow" />
            <span>Time Remaining: {formatTimer(secondsRemaining)}</span>
          </div>
        )}
      </div>

      {/* Quiz Title Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
              Mathematics Chapter 3 Assessment
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
              {quiz.title}
            </h1>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            {quiz.totalMarks} Total Marks
          </span>
        </div>
      </div>

      {/* Result Card if submitted */}
      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-card space-y-6 text-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-highlight ${
              isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
            }`}
          >
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span
              className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isPassed ? '🎉 Test Passed!' : 'Needs Improvement'}
            </span>
            <h2 className="text-3xl font-black text-slate-900 pt-2">
              Your Score: {score} / {quiz.totalMarks} ({percentage}%)
            </h2>
            <p className="text-xs text-slate-500">
              You answered {correctCount} of {quiz.questions.length} questions correctly.
            </p>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Detailed Answer Key & Explanations:</h3>
            {quiz.questions.map((q, qIdx) => {
              const userAns = selectedAnswers[qIdx];
              const isCorrect = userAns === q.correctOptionIndex;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border ${
                    isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-red-50/50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1.5 flex-1">
                      <div className="text-xs font-bold text-slate-900">
                        Q{qIdx + 1}. {q.text}
                      </div>
                      <div className="text-xs text-slate-600">
                        Your answer: <span className="font-bold">{q.options[userAns] || 'Not answered'}</span>
                      </div>
                      {!isCorrect && (
                        <div className="text-xs text-emerald-700 font-bold">
                          Correct answer: {q.options[q.correctOptionIndex]}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-500 bg-white p-2 rounded-xl border border-slate-200 mt-1">
                        💡 <span className="font-semibold">Explanation:</span> {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setSecondsRemaining(quiz.durationMinutes * 60);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Retake Test
            </button>
            <button
              onClick={() => openLesson('les-m3-06')}
              className="px-5 py-2.5 bg-edexora-yellow hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-sm"
            >
              Review Lesson Video
            </button>
          </div>
        </div>
      ) : (
        /* Question Runner View */
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-card space-y-6">
          {/* Question Stepper */}
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-500">
              Question {currentQIndex + 1} of {quiz.questions.length}
            </span>
            <div className="flex items-center gap-1.5">
              {quiz.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition ${
                    currentQIndex === idx
                      ? 'bg-slate-950 text-white'
                      : selectedAnswers[idx] !== undefined
                      ? 'bg-edexora-yellow text-slate-950'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.text}
            </h2>

            {/* Multiple choice options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQIndex] === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between text-xs md:text-sm font-semibold ${
                      isSelected
                        ? 'border-slate-950 bg-edexora-yellow/20 text-slate-950 font-bold shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                          isSelected
                            ? 'border-slate-950 bg-slate-950 text-white'
                            : 'border-slate-300 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(currentQIndex - 1)}
              className="px-4 py-2 bg-slate-100 disabled:opacity-40 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              Previous
            </button>

            {currentQIndex < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(currentQIndex + 1)}
                className="px-5 py-2.5 bg-slate-950 text-white font-bold rounded-xl text-xs transition hover:bg-slate-800"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 bg-edexora-yellow text-slate-950 font-black rounded-xl text-xs transition hover:bg-yellow-400 shadow-highlight"
              >
                Submit Test & View Score
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
