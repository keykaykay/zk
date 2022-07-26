<script lang="ts" setup>
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const router = useRouter()

const handleMenuClick = ({ key }: { key: string; keyPath: string[] }) => {
  router.push(key)
}
</script>
<template>
  <div class="h-full header-topmenu min-w-0 flex-1">
    <a-menu
      :selectedKeys="appStore.selectedKeys"
      theme="light"
      mode="horizontal"
      @click="handleMenuClick"
    >
      <template #overflowedIndicator>
        <div class="i-ant-design:ellipsis-outlined text-2xl" />
      </template>
      <a-menu-item v-for="menu in appStore.menus" :key="menu.path">
        <template #icon>
          <div :class="`i-${menu.meta.icon}`"></div>
        </template>
        <span>{{ menu.meta.title }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<style lang="less">
.header-topmenu {
  .ant-menu {
    height: 100%;
    display: flex;
    justify-content: center;
    .ant-menu-overflow-item {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }
  }
}

.ant-menu-submenu-popup {
  .ant-menu-item {
    display: flex !important;
    justify-content: flex-start !important;
    align-items: center !important;
  }
}
</style>
