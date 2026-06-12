"use client";

import React, { useState, useEffect } from "react";
import { QuizCountdown } from "./QuizCountdown";
import { QuizTaker } from "./QuizTaker";
import type { QuizWithQuestions, Night } from "@/types/database";

interface QuizGateProps {
  quiz: QuizWithQuestions & { night: Pick<Night, "id" | "number" | "title" | "slug"> };
}

/**
 * Client-side gate that handles the quiz open/closed state reactively.
 * - If the quiz is not yet open, shows QuizCountdown.
 * - Once the scheduled time arrives, automatically transitions to QuizTaker.
 * - No manual page refresh needed.
 */
export function QuizGate({ quiz }: QuizGateProps) {
  const hasQuestions = quiz.questions.length > 0;
  const [isOpen, setIsOpen] = useState(() => {
    if (!quiz.opens_at) return true;
    return new Date(quiz.opens_at) <= new Date();
  });

  useEffect(() => {
    if (isOpen || !quiz.opens_at) return;

    const msUntilOpen = new Date(quiz.opens_at).getTime() - Date.now();

    // If already past, open immediately
    if (msUntilOpen <= 0) {
      setIsOpen(true);
      return;
    }

    // Set a precise timeout to open exactly at the scheduled time
    const timeout = setTimeout(() => setIsOpen(true), msUntilOpen);

    // Also re-check every 30 seconds as a safety net
    const interval = setInterval(() => {
      if (new Date(quiz.opens_at!).getTime() <= Date.now()) {
        setIsOpen(true);
        clearInterval(interval);
      }
    }, 30_000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [quiz.opens_at, isOpen]);

  if (!isOpen && quiz.opens_at) {
    return <QuizCountdown opensAt={quiz.opens_at} onOpen={() => setIsOpen(true)} />;
  }

  if (!hasQuestions) {
    return (
      <p className="font-kufi text-karbala-secondary text-center">
        الاختبار قيد الإعداد. عد لاحقاً.
      </p>
    );
  }

  return <QuizTaker quiz={quiz} />;
}
