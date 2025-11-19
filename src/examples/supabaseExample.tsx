/**
 * Supabase + Zustand example (React Native)
 *
 * Purpose: Minimal, copy-paste ready example demonstrating how to
 * use the Supabase client together with the `useUserStore` and
 * `useAppStore` Zustand stores.
 *
 * Notes:
 * - This is an example component for development/testing only.
 * - Replace demo credentials with real auth flows; do NOT hardcode
 *   production credentials in source control.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { supabase, getCurrentUser, signIn } from '@/services/supabase/client';
import { useUserStore } from '@/store/userStore';
import { useAppStore } from '@/store/appStore';

const SupabaseExample: React.FC = () => {
  // Zustand stores (very small example)
  const { user, setUser, clearUser } = useUserStore();
  const { loading, setLoading, setError, reset } = useAppStore();

  const [message, setMessage] = useState<string>('');

  // On mount, try to load the current user and set it in the store.
  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (u) setUser({ id: u.id, email: u.email ?? null });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Example sign-in flow using the example helper in client.ts
  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      // WARNING: demo credentials — replace with real flow
      const u = await signIn('demo@example.com', 'password123');
      setUser({ id: u.id, email: u.email ?? null });
      setMessage(`Signed in as ${u.email ?? u.id}`);
    } catch (err: any) {
      const text = err?.message ?? String(err ?? 'Unknown error');
      setError(text);
      setMessage(`Sign in failed: ${text}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUser = async () => {
    setLoading(true);
    setMessage('');
    try {
      const u = await getCurrentUser();
      if (u) {
        setUser({ id: u.id, email: u.email ?? null });
        setMessage(`Current user: ${u.email ?? u.id}`);
      } else {
        setMessage('No user signed in');
      }
    } catch (err: any) {
      setMessage(`Error fetching user: ${err?.message ?? String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: '700', marginBottom: 8 }}>Supabase Example</Text>
      <Text>User: {user?.email ?? 'No user'}</Text>
      <Text>Loading: {String(loading)}</Text>
      <Text>Message: {message}</Text>

      <View style={{ height: 12 }} />
      <Button title="Sign in (demo)" onPress={handleSignIn} />
      <View style={{ height: 8 }} />
      <Button title="Get current user" onPress={handleGetUser} />
      <View style={{ height: 8 }} />
      <Button
        title="Clear user"
        onPress={() => {
          clearUser();
          reset();
          setMessage('Cleared store');
        }}
      />
    </View>
  );
};

export default SupabaseExample;
