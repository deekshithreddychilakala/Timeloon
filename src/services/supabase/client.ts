/**
 * Supabase client initialization
 *
 * Purpose: Centralized Supabase client for the app. Import `supabase`
 * where needed. This file uses placeholder environment variables
 * which you should replace with real values in a secure way
 * (e.g. using `expo-constants` or another env strategy).
 */

import { createClient } from '@supabase/supabase-js';

// Replace these with your real keys or load from secure env at runtime.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

/**
 * Supabase client instance
 * Usage: import { supabase } from '@/services/supabase/client'
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Example helper: getCurrentUser
 * Returns the currently authenticated user (or null).
 * Note: supabase.auth.getUser() is used in Supabase JS v2.
 */
export async function getCurrentUser() {
    try {
        const { data } = await supabase.auth.getUser();
        return data?.user ?? null;
    } catch (error) {
        // In production, consider logging this to an error service
        console.warn('[supabase] getCurrentUser error', error);
        return null;
    }
}

/**
 * Example helper: signIn(email, password)
 * A simple email/password sign-in helper which returns the user on success.
 * Throws an error when sign in fails.
 *
 * Usage:
 * try { const user = await signIn('me@domain.com','password'); } catch(e) {}
 */
export async function signIn(email: string, password: string) {
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error) throw response.error;
    return response.data.user;
}

// You can expand this file with signUp, signOut, password reset helpers, etc.
