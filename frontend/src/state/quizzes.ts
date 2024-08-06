import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Quiz } from "../definitions";

interface QuizState {
  createdQuizzes: Quiz[] | null;
  availableQuizzes: Quiz[] | null;
  setCreatedQuizzes: (quizzes: Quiz[]) => void;
  setAvailableQuizzes: (quizzes: Quiz[]) => void;
  resetState: () => void;
}

export const useQuizzesState = create<QuizState>()(
  persist(
    (set) => ({
      createdQuizzes: null,
      availableQuizzes: null,
      setCreatedQuizzes: (quizzes) => set({ createdQuizzes: quizzes }),
      setAvailableQuizzes: (quizzes) => set({ availableQuizzes: quizzes }),
      resetState: () => set({ createdQuizzes: null, availableQuizzes: null }),
    }),
    {
      name: "quizzes-storage",
    },
  ),
);
