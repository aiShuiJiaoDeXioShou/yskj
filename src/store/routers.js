import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = { path: '/pages/index/index', }

export const useRouterStore = defineStore(
  'routers',
  () => {
    const routers = ref({ ...initState })

    return {
      routers
    }
  },
  {
    persist: true,
  },
)
