<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view class="home-root">
    <image class="w-full" src="/static/index/index_bg.jpg" mode="widthFix" />
    <view class="container"></view>
  </view>
  <Tabbar />
</template>

<script lang="js" setup>
import Tabbar from '@/components/tabbar.vue'
</script>

<style lang="scss" scoped>
page {
  background-color: #0f71f6;
}
</style>
