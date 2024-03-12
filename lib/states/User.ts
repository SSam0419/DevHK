import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user: User | null | undefined;
  userProfile:
    | null
    | undefined
    | {
        id: string;
        username: string;
        biography: string;
      };
  setUserProfile: (
    profile: { username: string; biography: string; id: string } | null
  ) => void;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userProfile: undefined,
  user: undefined,
  setUserProfile: (
    profile: { username: string; biography: string; id: string } | null
  ) => set((state) => ({ userProfile: profile })),
  setUser: (user: User | null) => set((state) => ({ user: user })),
}));
