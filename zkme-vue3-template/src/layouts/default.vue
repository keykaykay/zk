<script lang="ts" setup>
import { isEmpty } from '@/utils/is'
import logoImage from '@/assets/logo.svg'

const router = useRouter()
const route = useRoute()

const collapsed = ref<boolean>(false)

const selectedKeys = computed(() => [route.path])

const menus = computed(() =>
  router
    .getRoutes()
    .filter((router) => !isEmpty(router.meta))
    .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
)

const handleMenuClick = ({ key }: { key: string; keyPath: string[] }) => {
  router.push(key)
}
</script>
<template>
  <a-layout class="h-full w-full">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div
        class="h-48px flex items-center justify-center text-white cursor-pointer"
      >
        <img :src="logoImage" alt="ICDI" class="h-40px w-40px" />
        <div class="ml-4 text-2xl font-bold mt-1" v-show="!collapsed">ICDI</div>
      </div>
      <a-menu
        :selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="handleMenuClick"
      >
        <a-menu-item v-for="menu in menus" :key="menu.path">
          <template #icon>
            <div :class="`i-${menu.meta.icon}`"></div>
          </template>
          <span>{{ menu.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="flex-1!">
      <div class="flex flex-col bg-white! p-0! h-80px!">
        <a-layout-header
          class="h-48px! p-0! bg-white! text-#000! flex items-center justify-between shadow"
        >
          <div>
            <div
              class="i-carbon:property-relationship ml-3 text-xl cursor-pointer"
              @click="collapsed = !collapsed"
            ></div>
          </div>
          <div>right</div>
        </a-layout-header>
        <div class="flex-1">tab</div>
      </div>
      <a-layout-content class="flex-1! m-5 bg-white">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
