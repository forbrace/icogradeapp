import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/Ico/Create'
import Edit from '@/components/Ico/Edit'
import Ico from '@/components/Ico/Ico'
import List from '@/components/Ico/List'
// import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Create
    },
    {
      path: '/icos/:id',
      name: 'Ico',
      props: true,
      component: Ico
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      props: true,
      component: Edit
      // beforeEnter: AuthGuard
    },
    {
      path: '/icos',
      name: 'List',
      component: List
      // beforeEnter: AuthGuard
    },
    {
      path: '*',
      component: Create
    }
  ],
  mode: 'history'
})
