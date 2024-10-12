<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '宇森科技软件商城',
  },
}
</route>

<template>
  <wd-search v-model="value" @search="search" @cancel="cancel" cancel-txt="搜索" />

  <!-- 这里是推广图片 -->
  <view class="p-2">
    <wd-swiper :list="swiperList" autoplay :current="current" @click="handleClick" @change="onChange"></wd-swiper>
  </view>

  <!-- 下面是分类商品 -->
  <view class="rounded-4 p-2">
    <wd-grid :column="3">
      <wd-grid-item @click="goCategory(item)" icon-size="30px" use-icon-slot v-for="item in categorys"
        :text="item.categoryName">
        <template #icon>
          <image class="w-30px" mode="widthFix" :src="getStrapiImage(item.icon)" />
        </template>
      </wd-grid-item>
    </wd-grid>
  </view>



  <!-- 推荐列表 -->
  <view class="pos-relative flex gap-2 items-center overflow-hidden mt-2 pl-2">
    <view class="flex transition-all gap-2" :style="{ transform: `translateX(${translateX}px)` }"
      @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
      <!-- 卡片1 -->
      <view v-for="product in products.slice(0, 4)"
        class="min-w-81vw w-81vw shadow-2xl bg-white shadow-lg rounded-lg max-w-sm p-4 flex flex-col">
        <image :src="getStrapiImage(product.product_image)" mode="heightFix" alt="Card Image"
          class="h-48 rounded-t-lg flex-auto m-auto" />
        <view class="p-4">
          <view @click="goProduct(product)" class="text-xl font-bold mb-2">{{ product.name }}</view>
          <view class="text-gray-700 mb-4" v-html="product.description">
          </view>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            联系我们
          </button>
        </view>
      </view>
    </view>
  </view>

  <!-- 历史开发的软件 -->
  <view class="flex flex-col gap-1 items-center pt-1 mt-1 pb-16">
    <view @click="goProduct(product)" v-for="product in products.slice(4)"
      class="w-95vw pt-2 shadow-sm rounded-2 bg-white flex flex-col">
      <image :src="getStrapiImage(product.product_image)" mode="heightFix" alt="Card Image"
        class="w-full h-48 rounded-t-lg flex-auto m-auto" />
      <view class="p-4">
        <h2 class="text-xl font-bold mb-2 flex items-center gap-1">
          {{ product.name }}
          <wd-tag v-if="product.tags && product.tags.length" :bg-color="product.tags[0].color" mark>{{
            product.tags[0].tag
            }}</wd-tag>
        </h2>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>
        <view class="flex gap-1">
          <wd-tag v-for="tag in product.tags" :bg-color="tag.color" mark>{{ tag.tag }}</wd-tag>
        </view>
      </view>
    </view>
  </view>

  <Tabbar />
</template>

<script lang="js" setup>
import Tabbar from '@/components/tabbar.vue'
import { httpGet } from '@/utils/http'
import { getStrapiImage } from '@/utils/image'

const value = ref('')
const current = ref(0)
const recommends = ref([])
const swiperList = ref([])
const categorys = ref([])
const products = ref([])

function goCategory(c) {
  uni.navigateTo({ url: `/pages/search/index?categoryId=${c.id}` });
}

function goProduct(p) {
  uni.navigateTo({ url: `/pages/product/index?id=${p.documentId}` })
}

// 获取推荐信息
async function getRecommends() {
  const res = await httpGet('/recommends?populate=*')
  recommends.value = res.data
  recommends.value.forEach((item) => {
    item.url = getStrapiImage(item.image)
    console.log(item.url)
    swiperList.value.push(item.url)
  })
}

function search() {
  uni.navigateTo({ url: '/pages/search/index?keyword=' + value.value })
}

function cancel() {
  search()
}

// 获取分类
async function getCategorys() {
  const res = await httpGet('/categorys?populate=*')
  categorys.value = res.data
}

// 获取商品信息
async function getProducts() {
  const res = await httpGet('/products?populate=*')
  products.value = res.data
}

onMounted(async () => {
  try {
    getRecommends()
    getCategorys()
    getProducts()
  } catch (e) {
    console.log(e)
  }
})

function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

// 控制卡片平移的X轴距离
const translateX = ref(0)

// 当前卡片的索引
const currentCardIndex = ref(1)

// 记录开始触摸时的X轴位置
const startX = ref(0)

// 开始拖动时触发的事件
const startDrag = (e) => {
  startX.value = e.touches[0].clientX
}

// 拖动中时触发的事件
const drag = (e) => {
  const deltaX = e.touches[0].clientX - startX.value
  translateX.value = deltaX - currentCardIndex.value * ((81 * window.innerWidth) / 100)
}

// 结束拖动时触发的事件
const endDrag = (e) => {
  const deltaX = e.changedTouches[0].clientX - startX.value
  const threshold = 50 // 滑动的最小距离，超过这个距离才会切换卡片

  // 向右滑动
  if (deltaX > threshold && currentCardIndex.value > 0) {
    currentCardIndex.value--
  }
  // 向左滑动
  else if (deltaX < -threshold && currentCardIndex.value < 2) {
    currentCardIndex.value++
  }

  // 根据新的卡片索引调整 translateX
  translateX.value = -currentCardIndex.value * ((81 * window.innerWidth) / 100)
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
</style>
