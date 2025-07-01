import { create } from "zustand";

export type UserRole = "VIEWER" | "REVIEWER" | "APPROVER" | "ADMIN";

export interface MdlUser {
  id: number;
  name: string;
  role: UserRole;
  creation_date: string;
  creation_user: string;
  last_modification_date: string;
  last_modification_user: string;
  region: string;
  site: string;
  ad_user_id: number;
}

interface UserStore {
  user: MdlUser | null;
  setUser: (user: MdlUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
