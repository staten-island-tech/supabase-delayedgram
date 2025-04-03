import { reactive } from 'vue'
const users = reactive({})

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }