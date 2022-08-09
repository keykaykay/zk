import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { localCacheStorage } from '@/utils/storage'

class ZKHttp {

  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (request) => {
        const token = localCacheStorage.get('token')
        token
          && (request.data = {
            ...request.data,
            token,
          })
        return request
      },
      (error) => {
        return error
      },
    )
    this.instance.interceptors.response.use(
      (response) => {
        return response?.data
      },
      (error) => {
        return error
      },
    )
  }

  get<T = any>(config: AxiosRequestConfig<T>): Promise<T> {
    return this.instance.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig<T>): Promise<T> {
    return this.instance.request({ ...config, method: 'POST' })
  }
}

export const httpInstance = new ZKHttp({
  timeout: 10000,
  baseURL: '/api',
})