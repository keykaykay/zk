interface App {
  collapsed: boolean
  visibleExitModal: boolean
  visibleProjectSettingDrawer: boolean
  visibleMenuDrawer: boolean
  model: 'left' | 'top'
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): App => ({
    collapsed: false,
    model: 'left',
    visibleExitModal: false,
    visibleMenuDrawer: false,
    visibleProjectSettingDrawer: false
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
  actions: {}
})
