<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { localCacheStorage } from '@/utils/storage'

interface LoginForm {
  username: string
  password: string
}

const router = useRouter()
const submitLoading = ref(false)
const loginForm = reactive<LoginForm>({
  username: 'admin',
  password: '123456'
})
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const handleFinishEvent = (val: LoginForm) => {
  console.log('Success:', val)
  submitLoading.value = true
  submitLoading.value = false
  localCacheStorage.set('token', '123456')
  router.replace('/')
  message.success('登录成功')
}
</script>
<template>
  <div class="w-full h-full flex justify-center items-center login-wrap">
    <div
      v-show="submitLoading"
      class="position-absolute z-1 w-full h-full flex justify-center items-center bg-white bg-opacity-80"
    >
      <div class="i-eos-icons:three-dots-loading text-8xl text-#1890ff"></div>
    </div>
    <a-card>
      <a-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        autocomplete="off"
        @finish="handleFinishEvent"
        class="w-90 h-90"
      >
        <a-form-item>
          <div class="w-full flex justify-center items-center">
            <h1>呼叫中心</h1>
          </div>
        </a-form-item>
        <a-form-item name="username">
          <a-input
            v-model:value="loginForm.username"
            class="w-55 m-2"
            placeholder="请输入账号"
          >
            <template #prefix>
              <div class="a-input__icon i-mdi:account-circle-outline" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input
            v-model:value="loginForm.password"
            class="w-50 m-2"
            placeholder="请输入密码"
            type="password"
            show-password
          >
            <template #prefix>
              <div class="a-input__icon i-mdi:lock-outline" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="flex justify-center">
            <a-button
              type="primary"
              :loading="submitLoading"
              class="w-80 mt-20"
              html-type="submit"
            >
              登录
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<style lang="less" scoped>
.login-wrap {
  background-image: url(@/assets/login-bg.svg);
}
</style>
<route lang="yaml">
meta:
  layout: fullScreen
</route>
