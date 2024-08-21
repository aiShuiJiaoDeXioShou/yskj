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
    <view class="container">
      <!-- 左侧圆形部分 -->
      <view class="circle">宇森科技</view>

      <!-- 右侧矩形部分 -->
      <view class="rectangle">
        <text>成立历史，介绍来历，参与事情。</text>
      </view>
    </view>
  </view>
</template>

<script lang="js" setup>
// TODO
</script>

<style lang="scss" scoped>
.home-root {
  @apply bg-white min-h-screen flex items-center justify-center;
}

.container {
  @apply flex items-center p-4;
}

.circle {
  @apply w-20 h-20 rounded-full flex items-center justify-center text-center bg-blue-200 text-black;
}

.rectangle {
  @apply w-60 h-20 ml-4 flex items-center justify-center text-black border rounded-lg;
  border-color: #000000;
}
</style>
