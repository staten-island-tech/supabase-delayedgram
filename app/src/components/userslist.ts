import { reactive } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia';
const users = reactive({})
let usercount = 0
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }


export const useAuthStore = defineStore('auth', () => {
  const users = ref<User[]>([]);  // List of registered users
  const user = ref<User | null>(null);  // Logged-in user
  const token = ref<string | null>(localStorage.getItem('token'));  // Authentication token

  const signUp = (name: string, password: string): boolean => {
    if (users.value.find(u => u.name === name)) {
      return false;  // Prevent duplicate names
    }
    const newUser: User = { id: usercount + 1, name, password };
    users.value.push(newUser);
    return true;
  }; })