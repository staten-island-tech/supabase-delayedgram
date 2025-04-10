import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import FollowerView from '../views/FollowerView.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupView from '../views/SignupView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    }, 
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  {
      path: '/profile',
      name: 'profile',
      component: ProfileView,          
    },
    {
      path: '/follower',
      name: 'follower',
      component: FollowerView,
    },
    {
      path: '/post',
      name: 'post',
      component: CreatePostView,
    }, 
  ],
})

export default router
