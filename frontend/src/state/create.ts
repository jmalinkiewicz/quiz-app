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
