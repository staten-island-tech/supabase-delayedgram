import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import FollowerView from '../views/FollowerView.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupView from '../views/SignupView.vue'
import { useUserStore } from '@/components/stores/userlist'
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
      // meta: { requiresAuth : true },
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
      meta: { requiresAuth : true },
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
router.beforeEach((to, from, next) => {
  const auth = useUserStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn){
    next({ path: '/'});
    console.log(auth);
  } else {
    next()
  }
});
export default router
