import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { sitePaths } from '../utils/site'

// Home stays statically imported: it is the landing chunk. Every other view —
// including NotFound — is lazy so its code, scoped styles, and content data
// (blog corpus, case studies) ship only on the pages that render them.
// Direct hits on bad URLs still render instantly: Vercel/Nginx serve the
// prerendered dist/404.html, which already references the NotFound chunk.
const NotFound = () => import('../views/NotFound.vue')
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
