<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '商品详情',
  },
}
</route>

<template>
  <view class="p-1 bg-white">
    <!-- 轮播图：多张图片 -->
    <view v-if="product.product_images && product.product_images.length > 0" class="swiper-container mb-4">
      <swiper autoplay="true" interval="3000" class="rounded-lg">
        <swiper-item @click="previewImage(index)" v-for="(image, index) in product.product_images" :key="index">
          <image :src="getStrapiImage(image)" mode="aspectFit" class="w-full h-48 rounded-lg" alt="Product Image" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 商品名称 -->
    <view class="text-xl font-bold mb-2">{{ product.name }}</view>

    <!-- 商品描述 -->
    <view class="text-sm text-gray-600 mb-4">{{ product.description }}</view>

    <!-- 商品分类 -->
    <view v-if="product.categoryType" class="text-sm text-gray-500 mb-4">
      分类: {{ product.categoryType.map(item => item.categoryName) }}
    </view>

    <!-- 商品标签 -->
    <view class="flex gap-1">
      <wd-tag v-for="tag in product.tags" :bg-color="tag.color" mark>{{ tag.tag }}</wd-tag>
    </view>

    <view class="pt-1" v-html="product.detail"></view>

    <!-- 购买按钮 -->
    <button class="w-full py-3 bg-blue-500 text-white text-center rounded-lg pos-fixed bottom-0">
      联系客服
    </button>
  </view>
</template>

<script setup>
import { httpGet } from '@/utils/http'
import { getStrapiImage } from '@/utils/image'

// 模拟从 Strapi 获取数据的方法
const product = ref({})


// 预览图片
function previewImage(currentIndex) {
  const imageUrls = product.value.product_images.map(image => getStrapiImage(image));

  uni.previewImage({
    urls: imageUrls, // 传入所有图片的数组
    current: imageUrls[currentIndex], // 当前点击的图片
  });
}

// 模拟获取商品详情的方法
const fetchProduct = async (id) => {
  // 替换为实际的 API 调用
  const res = await httpGet(`/products/${id}?populate=*`)
  product.value = res.data
}

onLoad((options) => {
  if (options.id) {
    fetchProduct(options.id)
  } else {
    uni.showToast({ icon: 'none', title: '该商品已下架' })
    uni.navigateTo({ url: "/pages/shop/index" })
  }
})
</script>

<style scoped>
.swiper-container {
  height: 12rem;
}

page {
  background-color: #F5F5F5;
}
</style>
