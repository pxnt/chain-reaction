import $axios from './AxiosService'

export default class MetaService {
  static async health() {
    try {
      const response = await $axios().get<{ success: boolean }>('/_meta/health')
      return response?.data
    }
    catch (err) {
      console.log('Errored at health', err)
      return {
        success: false,
      }
    }
  }
}