import Vue from 'vue'
import Router from 'vue-router'
import AboutMe from './views/AboutMe.vue'
import Admin from './views/admin.vue'
import Dash from './views/dashboard.vue'
import Detail from './views/article-detail.vue'
import Edit from './views/edit-article.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/about-me',
      name:'aboutme',
      component: AboutMe
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dash
    },
    {
      path: '/article/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/article/edit/:id',
      name: 'edit',
      component: Edit
    }
  ]
})
