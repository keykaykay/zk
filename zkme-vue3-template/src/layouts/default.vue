<script lang="ts" setup>
import TopMenu from './components/TopMenu.vue'
import LeftMenu from './components/LeftMenu.vue'
import avatar from '@/assets/avatar1.gif'
import { useAppStore } from '@/store/app'
import { useMobile } from '@/hooks/useDevice'
import { localCacheStorage } from '@/utils/storage'
import { VITE_TITLE } from '@/utils/constant'

const { isFullscreen, toggle } = useFullscreen()
const { isMobile } = useMobile()
const appStore = useAppStore()
const router = useRouter()

const handleOpenExternalLinkEvent = () => {
  window.open('https://github.com/zkmefun', '__blank')
}

const handleModelChangeEvent = (model: 'left' | 'top') => {
  appStore.model = model
  appStore.visibleProjectSettingDrawer = false
}

const handleCollapseEvent = () => {
  if (isMobile.value) {
    appStore.visibleMenuDrawer = true
    appStore.collapsed = appStore.visibleMenuDrawer
  } else {
    appStore.collapsed = !appStore.collapsed
  }
}

const handleLogoutEvent = () => {
  appStore.visibleExitModal = false
  localCacheStorage.remove('token')
  router.push('/login')
}

watch([isMobile], () => {
  appStore.visibleMenuDrawer = false
  if (isMobile.value) {
    appStore.collapsed = true
  }
})
</script>
<template>
  <a-layout class="h-full w-full overflow-hidden">
    <a-layout-sider
      v-if="appStore.model === 'left' && !isMobile"
      v-model:collapsed="appStore.collapsed"
      :trigger="null"
      collapsible
    >
      <LeftMenu />
    </a-layout-sider>
    <a-layout class="flex-1!">
      <div class="flex flex-col bg-white! p-0!">
        <a-layout-header
          class="h-48px! p-0! bg-white! text-#000! flex items-center justify-between shadow overflow-hidden max-w-full"
        >
          <div v-if="appStore.model === 'left' || isMobile">
            <div
              class="ml-3 text-xl cursor-pointer"
              :class="[
                appStore.collapsed
                  ? 'i-line-md:menu-fold-right'
                  : 'i-line-md:menu-fold-left'
              ]"
              @click="handleCollapseEvent"
            ></div>
          </div>
          <div
            v-if="appStore.model === 'top' && !isMobile"
            class="h-48px ml-3 flex items-center justify-center cursor-pointer"
          >
            <div class="i-logos:delicious text-3xl"></div>
            <div class="ml-4 text-2xl font-bold mt-1">{{ VITE_TITLE }}</div>
          </div>
          <TopMenu v-if="appStore.model === 'top' && !isMobile" />
          <div class="flex items-center h-full">
            <div
              class="text-2xl mx-3 h-full cursor-pointer"
              :class="[
                isFullscreen
                  ? 'i-ant-design:fullscreen-exit-outlined'
                  : 'i-ant-design:fullscreen-outlined'
              ]"
              @click="toggle"
            />
            <a-popover placement="bottom" class="cursor-pointer h-full">
              <template #content>
                <div
                  class="flex items-center cursor-pointer"
                  @click="appStore.visibleExitModal = true"
                >
                  <div class="i-gg:log-off text-xl mx-2"></div>
                  <div>退出系统</div>
                </div>
              </template>
              <template #title>
                <div
                  class="flex items-center cursor-pointer"
                  @click="handleOpenExternalLinkEvent"
                >
                  <div class="i-akar-icons:github-outline-fill text-xl mx-2">
                    Github
                  </div>
                  <div>Github</div>
                </div>
              </template>
              <div class="flex items-center">
                <a-avatar :src="avatar" />
                <span class="mx-2 text-xl">admin</span>
              </div>
            </a-popover>
            <div
              class="i-ant-design:setting-outlined text-2xl mx-3 h-full cursor-pointer"
              @click="appStore.visibleProjectSettingDrawer = true"
            />
          </div>
        </a-layout-header>
        <!-- <div class="h-32px">tab</div> -->
      </div>
      <a-layout-content class="flex-1! m-2 bg-white">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <a-modal
    v-model:visible="appStore.visibleExitModal"
    centered
    :closable="false"
    :width="420"
    @ok="handleLogoutEvent"
    @cancel="appStore.visibleExitModal = false"
  >
    <div class="flex items-center">
      <div class="i-ic:round-tips-and-updates text-2xl text-#e8be5d"></div>
      <div class="text-16px font-bold mx-2">温馨提示</div>
    </div>
    <div class="mt-2">是否确认退出系统？</div>
  </a-modal>
  <a-drawer
    :width="300"
    title="项目配置"
    :bodyStyle="{
      padding: '16px',
      background: '#f3f4f6'
    }"
    :headerStyle="{
      padding: '16px',
      background: '#f3f4f6'
    }"
    :visible="appStore.visibleProjectSettingDrawer"
    @close="appStore.visibleProjectSettingDrawer = false"
  >
    <a-divider>导航栏模式</a-divider>
    <div class="flex items-center justify-around h-50px">
      <a-tooltip placement="bottom" @click="handleModelChangeEvent('left')">
        <template #title>
          <span>左侧菜单模式</span>
        </template>
        <div
          class="w-56px h-48px bg-gray-200 relative cursor-pointer setting-nav-item-leftmenu"
        ></div>
      </a-tooltip>
      <a-tooltip placement="bottom" @click="handleModelChangeEvent('top')">
        <template #title>
          <span>顶部菜单模式</span>
        </template>
        <div
          class="w-56px h-48px bg-gray-200 relative cursor-pointer setting-nav-item-topmenu"
        ></div>
      </a-tooltip>
    </div>
  </a-drawer>
  <a-drawer
    :width="200"
    placement="left"
    :closable="false"
    :bodyStyle="{
      padding: '0',
      background: '#001529'
    }"
    :visible="appStore.visibleMenuDrawer"
    @close="appStore.visibleMenuDrawer = false"
  >
    <LeftMenu />
  </a-drawer>
</template>
<style lang="less" scoped>
.setting-nav-item-leftmenu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 33%;
  height: 100%;
  background-color: #273352;
  border-radius: 4px 0px 0px 4px;
  z-index: 1;
}
.setting-nav-item-leftmenu::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #fff;
}

.setting-nav-item-topmenu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #273352;
}
</style>
