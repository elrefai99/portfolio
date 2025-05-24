import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjetcsView from '../views/ProjetcsView.vue'
import ResumeView from '../views/ResumeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjetcsView
    },
        {
      path: '/resume',
      name: 'resume',
      component: ResumeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
