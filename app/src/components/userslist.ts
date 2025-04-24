/* import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabaseclient';
import type { User } from '../components/AllInterfaces'

// Sample user data (you can replace this with dynamic data from a database or API)
export const users: User[] = [
  { id: 1, username: 'john_doe', email: 'john@example.com', password: 'password123' },
  { id: 2, username: 'jane_doe', email: 'jane@example.com', password: 'securepass456' },
];

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user?.id;
    token.value = data.session?.access_token ?? null;
    localStorage.setItem('token', token.value ?? '');

    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: userId, username });

      if (profileError) throw profileError;

      user.value = { id: Number(userId), username };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    token.value = data.session?.access_token ?? null;
    localStorage.setItem('token', token.value ?? '');

    const userId = data.user?.id;
    if (userId) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      user.value = { id: Number(userId), username: profileData.username };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;
    if (userId) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();

      if (profileData) {
        user.value = { id: Number(userId), username: profileData.username };
      }
    }
  };

  return { user, token, signUp, signIn, signOut, getCurrentUser };
});


 */

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabaseclient'
import type { SignUpData, SignInData } from '@/components/AllInterfaces'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const signUp = async ({ email, password, username }: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    const userId = data.user?.id
    token.value = data.session?.access_token ?? null
    localStorage.setItem('token', token.value ?? '')

    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: userId, username })

      if (profileError) throw profileError

      user.value = { id: userId, username }
    }
  }

  const signIn = async ({ email, password }: SignInData) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    token.value = data.session?.access_token ?? null
    localStorage.setItem('token', token.value ?? '')

    const userId = data.user?.id
    if (userId) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError

      user.value = { id: userId, username: profileData.username }
    }
  }

  return { user, token, signUp, signIn }
})
