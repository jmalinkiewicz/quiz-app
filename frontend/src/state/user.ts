import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../definitions";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetState: () => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetState: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
