import { isEmpty } from '@/utils/is'

interface App {
  collapsed: boolean
  model: 'left' | 'top'
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): App => ({
    collapsed: false,
    model: 'top'
  }),
  getters: {
    selectedKeys() {
      const route = useRoute()
      return [route.path]
    },
    menus() {
      const router = useRouter()
      return router
        .getRoutes()
        .filter((router) => router.meta.showMenu)
        .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
    }
  },
  actions: {
    handleMenuClick({ key }: { key: string; keyPath: string[] }) {
      const router = useRouter()
      console.log(key)
      // router.push(key)
    }
  }
})
