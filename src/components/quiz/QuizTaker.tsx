"use client";

import React, { useState } from "react";
import type { QuizWithQuestions } from "@/types/database";
import { QUIZ_MOTIVATIONAL_MESSAGES } from "@/constants";

interface QuizTakerProps {
  quiz: QuizWithQuestions;
}

function getMotivationalMessage(score: number, total: number, custom?: string | null) {
  if (custom) return custom;
  const msg = QUIZ_MOTIVATIONAL_MESSAGES.find(
    (m) => score >= m.min && score <= m.max
  );
  return msg?.message ?? "";
}

export function QuizTaker({ quiz }: QuizTakerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = quiz.questions.length;

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
    return (
      <div className="card-base p-8 md:p-12 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full border-2 border-karbala-gold flex items-center justify-center mx-auto mb-6 shadow-glow">
          <span className="font-cinzel text-3xl text-karbala-gold">
            {score}
          </span>
        </div>
        <h2 className="font-scheherazade text-3xl text-karbala-gold mb-4">
          إجاباتك الصحيحة: {score} / {totalQuestions}
        </h2>
        {message && (
          <p className="font-kufi text-body-lg text-karbala-gold-light leading-relaxed">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto">
      {quiz.questions.map((question, index) => (
        <div key={question.id} className="card-base p-6 md:p-8">
          <h3 className="font-scheherazade text-xl text-karbala-gold-light mb-6 leading-relaxed">
            <span className="text-karbala-gold ml-2">{index + 1}.</span>
            {question.question}
          </h3>
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <label
                key={answer.id}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  answers[question.id] === answer.id
                    ? "border-karbala-gold bg-[rgba(212,185,138,0.1)]"
                    : "border-gold-subtle hover:border-gold-medium"
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
                  className="w-4 h-4 text-karbala-gold focus:ring-karbala-gold"
                />
                <span className="font-kufi text-karbala-white">{answer.answer_text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={Object.keys(answers).length < totalQuestions}
          className="px-8 py-3 bg-karbala-gold text-karbala-black font-kufi rounded-pill hover:bg-karbala-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          إرسال الإجابات
        </button>
      </div>
    </form>
  );
}
