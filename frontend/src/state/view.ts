import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ViewState {
  quizzesViewType: "Carousel" | "Table";
  setQuizzesViewType: (viewType: "Carousel" | "Table") => void;
}

export const useViewState = create<ViewState>()(
  persist(
    (set) => ({
      quizzesViewType: "Carousel",
      setQuizzesViewType: (viewType: "Carousel" | "Table") =>
        set({ quizzesViewType: viewType }),
    }),
    {
      name: "view-storage",
    },
  ),
);
