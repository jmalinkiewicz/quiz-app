import { create } from "zustand";
import { BG } from "../definitions";

interface CreateState {
  title: string;
  description: string;
  background: BG | "";
  content: {
    question: string;
    answers: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setBackground: (background: BG) => void;
  addQuestion: (question: {
    question: string;
    answers: {
      text: string;
      isCorrect: boolean;
    }[];
  }) => void;
  addAnswer: (
    index: number,
    answer: { text: string; isCorrect: boolean },
  ) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  removeQuestion: (index: number) => void;
  resetState: () => void;
}

export const useCreateState = create<CreateState>((set) => ({
  title: "",
  description: "",
  background: "",
  content: [],
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setBackground: (background) => set({ background }),
  addQuestion: (question) =>
    set((state) => ({
      content: [...state.content, question],
    })),
  addAnswer: (index, answer) =>
    set((state) => {
      const content = state.content.map((question, i) =>
        i === index
          ? {
              ...question,
              answers: [...question.answers, answer],
            }
          : question,
      );
      return { content };
    }),
  removeAnswer: (questionIndex, answerIndex) =>
    set((state) => {
      const content = state.content.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              answers: question.answers.filter((_, j) => j !== answerIndex),
            }
          : question,
      );
      return { content };
    }),
  removeQuestion: (index) =>
    set((state) => ({
      content: state.content.filter((_, i) => i !== index),
    })),
  resetState: () =>
    set({
      title: "",
      description: "",
      background: "",
      content: [],
    }),
}));
