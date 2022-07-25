import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { useRouterGuards } from './guard'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

useRouterGuards(router)

export default router
