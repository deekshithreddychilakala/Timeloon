/**
 * App-level Zustand store
 *
 * Purpose: Small, global flags like loading/error that are shared across
 * the app. Keep this minimal — add feature-specific stores for complex state.
 */

import create from 'zustand';

export interface AppState {
    loading: boolean;
    error: string | null;
    setLoading: (v: boolean) => void;
    setError: (e: string | null) => void;
    reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    loading: false,
    error: null,
    setLoading: (v: boolean) => set({ loading: v }),
    setError: (e: string | null) => set({ error: e }),
    reset: () => set({ loading: false, error: null }),
}));

// Consider adding middleware (persist, devtools) later if needed.
