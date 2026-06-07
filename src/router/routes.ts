import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import projectsView from '../views/projectsView.vue'
import ResumeView from '../views/ResumeView.vue'
import BlogsView from '../views/BlogsView.vue'
import BlogPostView from '../views/BlogPostView.vue'
import { sitePaths } from '../utils/site'

export const routes: RouteRecordRaw[] = [
  {
    path: sitePaths.home,
    name: 'home',
    component: HomeView,
  },
  {
    path: sitePaths.projects,
    name: 'projects',
    component: projectsView,
  },
  {
    path: sitePaths.blogs,
    name: 'blogs',
    component: BlogsView,
  },
  {
    path: `${sitePaths.blogs}/:slug`,
    name: 'blog',
    component: BlogPostView,
  },
  {
    path: sitePaths.resume,
    name: 'resume',
    component: ResumeView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]
