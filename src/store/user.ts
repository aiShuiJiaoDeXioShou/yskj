import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  token:
    'c9f6de432ba6edb6c56d0a8d8e0feaaa8bfcf8b8d82ecf9976fd1fc2567b6f8c8f3775cfab90dd12e0124c486ed18bbd8c6ed509ee492c659c2b3b8c6bd102acc67b179095cdbc6cc1ccf79c0310f1a3be0771d29811ab88297a441107deabb493654c3297d39d60719340a4a4b82e692a99decbefd2c430d9a4c2561c0103f3',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
    }
  },
  {
    persist: true,
  },
)
