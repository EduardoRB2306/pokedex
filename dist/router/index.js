import Vue from 'vue';
import VueRouter from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DetailView from '../views/DetailView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
