import { ref } from 'vue';
import { defineStore } from 'pinia';
export const users = reactive([])
let usercount = 0
export interface User {
    id: number;
    username: string;
    password: string;
  }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));

  const signUp = (username: string, password: string): boolean => {
    if (users.value.find(u => u.username === username)) {
      return false;  // Prevent duplicate names
    }
    const newUser: User = { id: usercount + 1, username, password };
    users.value.push(newUser);
    return true;
  }; })
