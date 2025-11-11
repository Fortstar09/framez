import { create } from 'zustand';

interface User {
  _id: string;
  name?: string;
  image?: string | null;
  email?: string;
  phone?: string;
  bio?: string;
  gender?: string;
  // Add any other fields from your DB
}

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  clearUser: () => set({ currentUser: null }),
}));