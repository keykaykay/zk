import type { Router } from 'vue-router'

export function useRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    // if (to.path === '/about') {
    //   next('/')
    //   return
    // }
    next()
  })
}
