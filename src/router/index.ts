// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import {useAppStore} from '../store/app'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
    meta: { requiresAuth: true}
  },
  {
    path: '/auth/login',
    component: Login,
    meta: { requiresAuth: false}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  const store  = useAppStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !store.isLoggedIn) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
