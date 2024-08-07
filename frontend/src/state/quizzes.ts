import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Invite, Quiz } from "../definitions";

interface QuizState {
  createdQuizzes: Quiz[];
  availableQuizzes: Invite[];
  setCreatedQuizzes: (quizzes: Quiz[]) => void;
  setAvailableQuizzes: (quizzes: Invite[]) => void;
  resetState: () => void;
}

export const useQuizzesState = create<QuizState>()(
  persist(
    (set) => ({
      createdQuizzes: [],
      availableQuizzes: [],
      setCreatedQuizzes: (quizzes) => set({ createdQuizzes: quizzes }),
      setAvailableQuizzes: (quizzes) => set({ availableQuizzes: quizzes }),
      resetState: () => set({ createdQuizzes: [], availableQuizzes: [] }),
    }),
    {
      name: "quizzes-storage",
    },
  ),
);
