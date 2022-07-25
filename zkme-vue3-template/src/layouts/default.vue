<script lang="ts" setup>
import TopMenu from './components/TopMenu.vue'
import avatar from '@/assets/avatar1.gif'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const router = useRouter()

const visibleExitModal = ref(false)

const visibleProjectSettingDrawer = ref(false)

const handleMenuClick = ({ key }: { key: string; keyPath: string[] }) => {
  router.push(key)
}

const handleOpenExternalLinkEvent = () => {
  window.open('https://github.com/zkmefun', '__blank')
}

const handleModelChangeEvent = (model: 'left' | 'top') => {
  appStore.model = model
  visibleProjectSettingDrawer.value = false
}
const { isFullscreen, toggle } = useFullscreen()
</script>
<template>
  <a-layout class="h-full w-full">
    <a-layout-sider
      v-if="appStore.model === 'left'"
      v-model:collapsed="appStore.collapsed"
      :trigger="null"
      collapsible
    >
      <div
        class="h-48px flex items-center justify-center text-white cursor-pointer"
      >
        <div class="i-logos:looker-icon text-3xl"></div>
        <div class="ml-4 text-2xl font-bold mt-1" v-show="!appStore.collapsed">
          ICDI
        </div>
      </div>
      <a-menu
        :selectedKeys="appStore.selectedKeys"
        theme="dark"
        mode="inline"
        @click="handleMenuClick"
      >
        <a-menu-item v-for="menu in appStore.menus" :key="menu.path">
          <template #icon>
            <div :class="`i-${menu.meta.icon}`"></div>
          </template>
          <span>{{ menu.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="flex-1!">
      <div class="flex flex-col bg-white! p-0!">
        <a-layout-header
          class="h-48px! p-0! bg-white! text-#000! flex items-center justify-between shadow overflow-hidden"
        >
          <div v-if="appStore.model === 'left'">
            <div
              class="ml-3 text-xl cursor-pointer"
              :class="[
                appStore.collapsed
                  ? 'i-line-md:menu-fold-right'
                  : 'i-line-md:menu-fold-left'
              ]"
              @click="appStore.collapsed = !appStore.collapsed"
            ></div>
          </div>
          <div
            v-if="appStore.model === 'top'"
            class="h-48px ml-3 flex items-center justify-center cursor-pointer"
          >
            <div class="i-logos:looker-icon text-3xl"></div>
            <div class="ml-4 text-2xl font-bold mt-1">ICDI</div>
          </div>
          <TopMenu v-if="appStore.model === 'top'" />
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
                  @click="visibleExitModal = true"
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
                <span class="mx-2 text-xl">ICDI</span>
              </div>
            </a-popover>
            <div
              class="i-ant-design:setting-outlined text-2xl mx-3 h-full cursor-pointer"
              @click="visibleProjectSettingDrawer = true"
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
    v-model:visible="visibleExitModal"
    centered
    :closable="false"
    :width="420"
    @ok="router.push('/')"
    @cancel="visibleExitModal = false"
  >
    <div class="flex items-center">
      <div class="i-ic:round-tips-and-updates text-2xl text-#e8be5d"></div>
      <div class="text-16px font-bold mx-2">温馨提示</div>
    </div>
    <div class="mt-2">是否确认退出系统？</div>
  </a-modal>
  <a-drawer
    :width="330"
    title="项目配置"
    :bodyStyle="{
      padding: '16px',
      background: '#f3f4f6'
    }"
    :headerStyle="{
      padding: '16px',
      background: '#f3f4f6'
    }"
    :visible="visibleProjectSettingDrawer"
    @close="visibleProjectSettingDrawer = false"
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
