import Vue from 'vue'
import VueRouter from 'vue-router'

import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

import HomePage from '@/views/Home'
import LoginPage from '@/views/Login'
import RegisterPage from '@/views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
        meta: {
          middleware: ['AuthMiddleware'],
        },
      },
    ],
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
        meta: {
          middleware: ['GuestMiddleware'],
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterPage,
        meta: {
          middleware: ['GuestMiddleware'],
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
