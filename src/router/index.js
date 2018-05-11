import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Create from '@/components/Ico/Create'
import Edit from '@/components/Ico/Edit'
import Ico from '@/components/Ico/Ico'
import List from '@/components/Ico/List'
import IcoGrades from '@/components/Ico/IcoGrades'
// import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/grades/:domain',
      name: 'IcoGrades',
      props: true,
      component: IcoGrades
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/ico/:id',
      name: 'Ico',
      props: true,
      component: Ico
    },
    {
      path: '/ico/:id/edit',
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
