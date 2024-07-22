import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
};

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    },
  ),
);
