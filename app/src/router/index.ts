import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import FollowerView from '../views/FollowerView.vue'
import LoginPage from '../views/LoginPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
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
      name: 'Profile',
      component: ProfileView,          
    },
    {
      path: '/follower',
      name: 'Follower',
      component: FollowerView,
    },
    {
      path: '/post',
      name: 'Post',
      component: CreatePostView,
    }, 
  ],
})

export default router
