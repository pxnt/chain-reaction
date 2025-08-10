import type { AxiosInstance } from 'axios'
import axiosLib from 'axios'
import { BaseEnvURLConfig } from '../config/BaseURLs'
import { App } from 'vue'

const axios = axiosLib.create()

axios.defaults.baseURL = BaseEnvURLConfig.API;

function includeCookies(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config) => {
      // add common cookies here
      config.withCredentials = true;
      return config
    },
    error => Promise.reject(error),
  )
}

export default {
  install: (_app: App<Element>) => {
    axios.defaults.baseURL = BaseEnvURLConfig.API;
  }
}

includeCookies(axios)

export { axios }
