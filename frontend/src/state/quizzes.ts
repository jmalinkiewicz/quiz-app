import { create } from "zustand";
import { persist } from "zustand/middleware";

type Quiz = {
  id: string;
  title: string;
  description: string;
  background: string;
  author: string;
};

interface QuizState {
  createdQuizzes: Quiz[] | null;
  availableQuizzes: Quiz[] | null;
  setCreatedQuizzes: (quizzes: Quiz[]) => void;
  setAvailableQuizzes: (quizzes: Quiz[]) => void;
}

export const useQuizzesState = create<QuizState>()(
  persist(
    (set) => ({
      createdQuizzes: null,
      availableQuizzes: null,
      setCreatedQuizzes: (quizzes) => set({ createdQuizzes: quizzes }),
      setAvailableQuizzes: (quizzes) => set({ availableQuizzes: quizzes }),
    }),
    {
      name: "quizzes-storage",
    },
  ),
);
