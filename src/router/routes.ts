import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import { sitePaths } from '../utils/site'

// Home and NotFound stay statically imported: home is the landing chunk, and
// the catch-all must render without an extra network round-trip. Every other
// view is lazy so its content data (blog corpus, case studies) ships only on
// the pages that render it.
export const routes: RouteRecordRaw[] = [
  {
    path: sitePaths.home,
    name: 'home',
    component: HomeView,
  },
  {
    path: sitePaths.projects,
    name: 'projects',
    component: () => import('../views/projectsView.vue'),
  },
  {
    path: `${sitePaths.projects}/:slug`,
    name: 'project-case',
    component: () => import('../views/ProjectCaseView.vue'),
  },
  {
    path: sitePaths.blogs,
    name: 'blogs',
    component: () => import('../views/BlogsView.vue'),
  },
  {
    path: `${sitePaths.blogs}/:slug`,
    name: 'blog',
    component: () => import('../views/BlogPostView.vue'),
  },
  {
    path: sitePaths.resume,
    name: 'resume',
    component: () => import('../views/ResumeView.vue'),
  },
  {
    path: '/404',
    name: 'not-found-static',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]
