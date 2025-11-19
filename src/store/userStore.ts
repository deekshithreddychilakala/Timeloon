/**
 * User Zustand store
 *
 * Purpose: Holds simple user state (id, email, etc.). Extend the `User`
 * interface with more fields as your app grows.
 */

import create from 'zustand';

// Define the shape of the user object stored in this store.
export interface User {
    id: string;
    email?: string | null;
    [key: string]: any;
}

export interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

/**
 * useUserStore
 * Usage:
 * const { user, setUser, clearUser } = useUserStore();
 */
export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

// Extend this store later with async actions (middleware) or persistent storage.
