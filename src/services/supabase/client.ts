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

// You can expand this file with signUp, signOut, password reset helpers, etc.
