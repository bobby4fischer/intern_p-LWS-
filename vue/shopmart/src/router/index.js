import { createRouter, createWebHistory } from 'vue-router'
import store from '../store.js'
import HomePage from '../pages/HomePage.vue' 
// No need to import all pages upfront 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    // Async Component (Lazy Loading)
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    // Async Component (Lazy Loading)
    component: () => import('../pages/SignupPage.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    // Async Component (Lazy Loading)
    component: () => import('../pages/ProductDetailPage.vue'),
    // Pass route params as props to the component
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../pages/CartPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: () => import('../pages/CategoryPage.vue'),
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 }
  }
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.auth.isAuthenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if route requires auth and user is not authenticated
    next({ name: 'Login' })
  } else if ((to.name === 'Login' || to.name === 'Signup') && isAuthenticated) {
    // Redirect to home if user is already logged in and tries to access login/signup
    next({ name: 'Home' })
  } else {
    // Otherwise, allow navigation
    next()
  }
})

export default router