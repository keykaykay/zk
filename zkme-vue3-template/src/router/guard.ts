import type { Router } from 'vue-router'
import { localCacheStorage } from '@/utils/storage'

export function useRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const token = localCacheStorage.get('token')
    if (!token) {
      if (to.path === '/login') {
        return next()
      }
      return next('/login')
    }
    if (to.path === '/login') {
      return
    }
    next()
  })
}
