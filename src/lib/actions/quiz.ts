"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActionClient } from "@/lib/supabase/action";
import { persistRowUpdate } from "@/lib/media/db-persist";
import { revalidatePath } from "next/cache";
import { revalidateNightById, revalidatePublicSite } from "@/lib/revalidate";

interface QuizQuestionInput {
  question: string;
  answers: { text: string; is_correct: boolean }[];
}

/**
 * Convert a datetime-local input value (e.g. "2026-06-12T20:00") to a proper
 * ISO 8601 string with the admin's timezone offset.
 * The admin is in Asia/Bahrain (UTC+3), so we append +03:00.
 * This ensures Supabase TIMESTAMPTZ stores the correct absolute time.
 */
function normalizeOpensAt(raw: string | null): string | null {
  if (!raw || raw.trim() === "") return null;

  // If the value already has timezone info (Z, +, or - after time), use as-is
  if (/[Z+]/.test(raw.slice(10)) || /T\d{2}:\d{2}.*-/.test(raw)) {
    return new Date(raw).toISOString();
  }

  // datetime-local gives "YYYY-MM-DDTHH:mm" — append admin's timezone (AST = UTC+3)
  const withTz = `${raw}:00+03:00`;
  const parsed = new Date(withTz);
  if (isNaN(parsed.getTime())) {
    console.error("[Quiz] Invalid opens_at value:", raw);
    return null;
  }
  return parsed.toISOString();
}

export async function saveQuizAction(formData: FormData) {
  const supabase = await createActionClient();

  const id = formData.get("id") as string | null;
  const night_id = formData.get("night_id") as string;
  const title = formData.get("title") as string;
  const is_enabled = formData.get("is_enabled") === "true";
  const rawOpensAt = (formData.get("opens_at") as string) || null;
  const opens_at = normalizeOpensAt(rawOpensAt);
  const motivational_message = (formData.get("motivational_message") as string) || null;
  const questionsJson = formData.get("questions") as string;

  try {
    const questions: QuizQuestionInput[] = questionsJson ? JSON.parse(questionsJson) : [];

    if (questions.length > 10) {
      return { success: false, error: "الحد الأقصى ١٠ أسئلة" };
    }

    let quizId = id;

    if (quizId) {
      const { error } = await persistRowUpdate(supabase, "quizzes", quizId, {
        night_id,
        title,
        is_enabled,
        opens_at: opens_at || null,
        motivational_message,
        updated_at: new Date().toISOString(),
      });
      if (error) throw new Error(error);

      await supabase.from("quiz_questions").delete().eq("quiz_id", quizId);
    } else {
      const { data, error } = await supabase.from("quizzes").insert({
        night_id,
        title,
        is_enabled,
        opens_at: opens_at || null,
        motivational_message,
      }).select().single();
      if (error) throw error;
      quizId = data.id;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const { data: question, error: qError } = await supabase
        .from("quiz_questions")
        .insert({
          quiz_id: quizId,
          question: q.question,
          sort_order: i + 1,
        })
        .select()
        .single();
      if (qError) throw qError;

      if (q.answers.length > 0) {
        const answersToInsert = q.answers.map((a, j) => ({
          question_id: question.id,
          answer_text: a.text,
          is_correct: a.is_correct,
          sort_order: j + 1,
        }));
        const { error: aError } = await supabase.from("quiz_answers").insert(answersToInsert);
        if (aError) throw aError;
      }
    }

    revalidatePath("/admin/quizzes");
    await revalidateNightById(night_id);
    await revalidatePublicSite();

    return { success: true, quizId };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteQuizAction(id: string) {
  const supabase = await createActionClient();
  const { data: quiz } = await supabase.from("quizzes").select("night_id").eq("id", id).single();
  const { error } = await supabase.from("quizzes").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/quizzes");
  await revalidateNightById(quiz?.night_id);
  await revalidatePublicSite();
  return { success: true };
}
