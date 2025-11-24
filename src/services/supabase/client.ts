/**
 * Supabase client initialization
 *
 * Purpose: Centralized Supabase client for the app. Import `supabase`
 * where needed. This file uses placeholder environment variables
 * which you should replace with real values in a secure way
 * (e.g. using `expo-constants` or another env strategy).
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prefer environment variables but fall back to the provided credentials.
// In Expo, process.env may not be populated at runtime depending on your setup.
// For development we include the provided values as sensible defaults.
const SUPABASE_URL =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://ohlcyyvhstbnzsrurldj.supabase.co';

const SUPABASE_ANON_KEY =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obGN5eXZoc3RibnpzcnVybGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMjY4MzUsImV4cCI6MjA2MTYwMjgzNX0.nF80YIGV0ePA5rORyBuaFIjpKAm568fwtBrKPnLGpwk';

/**
 * Supabase client instance
 * Usage: import { supabase } from '@/services/supabase/client'
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        // Use AsyncStorage so sessions persist across app restarts on React Native
        storage: AsyncStorage,
        // Don't try to read session from URL (not relevant in RN)
        detectSessionInUrl: false,
    },
});

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
    // Return full response so the caller can inspect session/user/error
    const response = await supabase.auth.signInWithPassword({ email, password });
    return response; // { data, error }
}

/**
 * Sign up helper
 * Creates a new user with email/password and optional user metadata
 * Returns the full Supabase response so callers can inspect `data` and `error`.
 */
export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
    // Supabase JS client typings vary between versions. Use an any-cast to
    // call signUp with metadata safely across versions.
    // The metadata will be stored as user_metadata on the Supabase user.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authAny: any = supabase.auth;
    const response = await authAny.signUp({ email, password }, { data: metadata });
    return response; // { data, error }
}

/**
 * Send password reset email to the provided address.
 * Returns the supabase response object.
 */
export async function sendPasswordReset(email: string) {
    // Use any-cast to support variations across supabase client versions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authAny: any = supabase.auth;
    // Many versions expose `resetPasswordForEmail` which sends the reset link.
    if (typeof authAny.resetPasswordForEmail === 'function') {
        return await authAny.resetPasswordForEmail(email);
    }
    // Fallback to api method if present
    if (authAny.api && typeof authAny.api.resetPasswordForEmail === 'function') {
        return await authAny.api.resetPasswordForEmail(email);
    }

    // If neither is available, throw an informative error
    throw new Error('Supabase client does not support resetPasswordForEmail on this SDK version.');
}

// You can expand this file with signUp, signOut, password reset helpers, etc.
