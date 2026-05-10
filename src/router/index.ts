import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import projectsView from '../views/projectsView.vue'
import ResumeView from '../views/ResumeView.vue'
import { sitePaths } from '../utils/site'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: sitePaths.home,
      name: 'home',
      component: HomeView
    },
    {
      path: sitePaths.projects,
      name: 'projects',
      component: projectsView
    },
    {
      path: sitePaths.resume,
      name: 'resume',
      component: ResumeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    }
  ]
})

export default router
