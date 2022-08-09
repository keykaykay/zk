<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { useMobile } from '@/hooks/useDevice'
import { VITE_TITLE } from '@/utils/constant'

const { isMobile } = useMobile()
const appStore = useAppStore()
const router = useRouter()

const handleMenuClick = ({ key }: { key: string; keyPath: string[] }) => {
  appStore.visibleMenuDrawer = false
  router.push(key)
}
</script>
<template>
  <div class="h-full w-full">
    <div
      class="h-48px flex items-center justify-center text-white cursor-pointer"
    >
      <div class="i-logos:delicious text-3xl"></div>
      <div
        class="ml-4 text-2xl font-bold mt-1"
        v-show="!appStore.collapsed || isMobile"
      >
        {{ VITE_TITLE }}
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
  </div>
</template>
