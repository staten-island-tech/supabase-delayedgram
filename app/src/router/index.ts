import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import FollowerView from '../views/FollowerView.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupView from '../views/SignupView.vue'
import { useUserStore } from '@/components/userlist'
import { supabase } from '../components/lib/supabaseclient'
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
      meta: { requiresAuth : true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView, 
      meta: { requiresAuth : true },
    },
    {
      path: '/follower',
      name: 'follower',
      component: FollowerView,
      meta: { requiresAuth : true },
    },
    {
      path: '/post',
      name: 'post',
      component: CreatePostView,
      meta: { requiresAuth : true },
    }, 
  ],
})

router.beforeEach(async (to, from, next) => {
  const { data, error } = await supabase.auth.getSession()
  const session = data?.session

  if (to.meta.requiresAuth && !session) {
    // Redirect unauthenticated users trying to access protected routes
    return next({ path: '/' })
  }

  return next()
})
export default router