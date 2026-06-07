"use client";

import React, { useState, useEffect } from "react";
import type { QuizWithQuestions } from "@/types/database";
import { QUIZ_MOTIVATIONAL_MESSAGES } from "@/constants";

interface QuizTakerProps {
  quiz: QuizWithQuestions;
}

function getMotivationalMessage(score: number, total: number, custom?: string | null) {
  if (custom) return custom;
  const percentage = (score / total) * 100;
  const msg = QUIZ_MOTIVATIONAL_MESSAGES.find(
    (m) => percentage >= m.min && percentage <= m.max
  );
  return msg?.message ?? "";
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function QuizTaker({ quiz }: QuizTakerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100) || 0;

  useEffect(() => {
    if (submitted) {
      // Trigger animation for percentage circle
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [submitted, percentage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;
    for (const question of quiz.questions) {
      const selected = answers[question.id];
      const correctAnswer = question.answers.find((a) => a.is_correct);
      if (selected && correctAnswer && selected === correctAnswer.id) {
        correct++;
      }
    }
    setScore(correct);
    setSubmitted(true);
  };

  if (submitted) {
    const message = getMotivationalMessage(score, totalQuestions, quiz.motivational_message);
    const dashArray = 283; // Circumference of a circle with r=45 (2 * pi * 45)
    const dashOffset = dashArray - (dashArray * animatedPercentage) / 100;

    return (
      <div className="space-y-10">
        {/* Results Summary */}
        <div className="card-base p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
          {/* Background decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-karbala-gold opacity-5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-36 h-36 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-[rgba(212,185,138,0.1)]" />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="text-karbala-gold drop-shadow-glow transition-all duration-1000 ease-out"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="font-cinzel text-4xl font-bold text-karbala-gold">{animatedPercentage}%</span>
              </div>
            </div>
            
            <h2 className="font-scheherazade text-4xl text-karbala-gold mb-4">
              إجاباتك الصحيحة: {score} من {totalQuestions}
            </h2>
            {message && (
              <p className="font-kufi text-body-lg text-karbala-secondary leading-relaxed bg-[rgba(212,185,138,0.05)] px-6 py-4 rounded-xl border border-[rgba(212,185,138,0.1)] inline-block">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Detailed Answers Review */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h3 className="font-scheherazade text-3xl text-center text-karbala-white mb-8">مراجعة الإجابات</h3>
          
          {quiz.questions.map((question, index) => {
            const selectedAnswerId = answers[question.id];
            const isQuestionCorrect = question.answers.find(a => a.id === selectedAnswerId)?.is_correct;

            return (
              <div key={question.id} className="card-base p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-ambient">
                {/* Status border indicator */}
                <div className={`absolute top-0 right-0 w-1.5 h-full ${isQuestionCorrect ? 'bg-green-500' : 'bg-red-500'} opacity-80 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
                
                <h4 className="font-scheherazade text-2xl text-karbala-gold-light mb-6 leading-relaxed flex items-start gap-3">
                  <span className="text-karbala-gold shrink-0 font-bold">{index + 1}.</span>
                  <span>{question.question}</span>
                </h4>

                <div className="space-y-3">
                  {question.answers.map((answer) => {
                    const isSelected = selectedAnswerId === answer.id;
                    const isCorrect = answer.is_correct;
                    
                    let bgClass = "bg-[rgba(255,255,255,0.02)] border-[rgba(212,185,138,0.1)] text-karbala-gray";
                    let icon = null;

                    if (isSelected && isCorrect) {
                      bgClass = "bg-[rgba(34,197,94,0.1)] border-green-500/50 text-green-400";
                      icon = <CheckIcon className="w-5 h-5 text-green-400" />;
                    } else if (isSelected && !isCorrect) {
                      bgClass = "bg-[rgba(239,68,68,0.1)] border-red-500/50 text-red-400";
                      icon = <XIcon className="w-5 h-5 text-red-400" />;
                    } else if (!isSelected && isCorrect) {
                      bgClass = "bg-[rgba(34,197,94,0.05)] border-green-500/30 text-green-300";
                      icon = <CheckIcon className="w-5 h-5 text-green-400 opacity-70" />;
                    }

                    return (
                      <div
                        key={answer.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${bgClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? (isCorrect ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20') : 'border-current opacity-50'}`}>
                            {isSelected && <div className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />}
                          </div>
                          <span className="font-kufi">{answer.answer_text}</span>
                        </div>
                        {icon && <div className="shrink-0 mr-4">{icon}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
      {quiz.questions.map((question, index) => (
        <div key={question.id} className="card-base p-6 md:p-8 transition-all hover:shadow-ambient">
          <h3 className="font-scheherazade text-2xl text-karbala-gold-light mb-6 leading-relaxed flex items-start gap-3">
            <span className="text-karbala-gold shrink-0 font-bold">{index + 1}.</span>
            <span>{question.question}</span>
          </h3>
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <label
                key={answer.id}
                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  answers[question.id] === answer.id
                    ? "border-karbala-gold bg-[rgba(212,185,138,0.1)] shadow-inner"
                    : "border-gold-subtle hover:border-gold-medium hover:bg-[rgba(212,185,138,0.02)]"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={answer.id}
                  checked={answers[question.id] === answer.id}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [question.id]: answer.id }))
                  }
                  className="w-5 h-5 text-karbala-gold focus:ring-karbala-gold bg-transparent border-karbala-gold-light/50"
                />
                <span className={`font-kufi text-lg ${answers[question.id] === answer.id ? "text-karbala-gold-light" : "text-karbala-white"}`}>
                  {answer.answer_text}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center pt-8">
        <button
          type="submit"
          disabled={Object.keys(answers).length < totalQuestions}
          className="px-10 py-4 text-lg bg-karbala-gold text-karbala-black font-kufi font-bold rounded-pill shadow-glow hover:bg-karbala-gold-light hover:-translate-y-1 hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          إرسال الإجابات
        </button>
      </div>
    </form>
  );
}
