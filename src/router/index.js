import Vue from 'vue'
import VueRouter from 'vue-router'

import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

import NotFoundPage from '@/views/NotFound'
import LoginPage from '@/views/Login'
import RegisterPage from '@/views/Register'
import HomePage from '@/views/Home'
import SettingPage from '@/views/Setting'
import NewPostPage from '@/views/NewPost'
import ReadPostPage from '@/views/ReadPost'

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
      {
        path: 'setting',
        name: 'Setting',
        component: SettingPage,
        meta: {
          middleware: ['AuthMiddleware'],
        },
      },
      {
        path: 'new-post',
        name: 'NewPost',
        component: NewPostPage,
        meta: {
          middleware: ['AuthMiddleware'],
        },
      },
      {
        path: 'read/:slug',
        name: 'ReadPost',
        component: ReadPostPage,
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
  {
    path: '*',
    component: MainLayout,
    children: [
      {
        path: '*',
        name: '404',
        component: NotFoundPage,
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
