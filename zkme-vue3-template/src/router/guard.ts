import { isNavigationFailure } from 'vue-router'
import type { Router } from 'vue-router'
import { localCacheStorage } from '@/utils/storage'
import { VITE_TITLE } from '@/utils/constant'

export function useRouterGuards(router: Router) {
  const title = useTitle()
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

  router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure)
    } else {
      title.value = `${VITE_TITLE} | ${to.meta.title as string}`
    }
  })
}
