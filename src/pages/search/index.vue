<route lang="json5" type="page">
  {
    layout: 'default',
    style: {
      navigationBarTitleText: '搜索页面',
    },
  }
  </route>

<template>
  <!-- 展示搜索条例 -->
  <wd-search class="pos-fixed top-40px w-full z-999" v-model="searchValue" cancel-txt="搜索" @search="search"
    @cancel="cancel" />
  <!-- 历史开发的软件 -->
  <view class="flex flex-col gap-2 items-center pt-1 mt-50px pb-16">
    <view v-for="product in products" :key="product.id" @click="goProduct(product)"
      class="w-95vw pt-2 shadow-sm rounded-2 bg-white flex flex-col">
      <image :src="getStrapiImage(product.product_image)" mode="heightFix" alt="Card Image"
        class="w-full h-48 rounded-t-lg flex-auto m-auto" />
      <view class="p-4">
        <h2 class="text-xl font-bold mb-2 flex items-center gap-1">
          {{ product.name }}
          <wd-tag v-if="product.tags && product.tags.length" :bg-color="product.tags[0].color" mark>
            {{ product.tags[0].tag }}
          </wd-tag>
        </h2>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>
        <view class="flex gap-1">
          <wd-tag v-for="tag in product.tags" :key="tag.id" :bg-color="tag.color" mark>{{ tag.tag }}</wd-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { httpGet } from '@/utils/http';
import { getStrapiImage } from '@/utils/image';

const products = ref([]);
const searchValue = ref('');
const categoryId = ref(null);

function goProduct(p) {
  uni.navigateTo({ url: `/pages/product/index?id=${p.documentId}` });
}

function search() {
  if (categoryId.value) {
    fetchProductsByCategory(categoryId.value);
  } else {
    loadSearchData(searchValue.value);
  }
}

function cancel() {
  if (categoryId.value) {
    fetchProductsByCategory(categoryId.value);
  } else {
    loadSearchData(searchValue.value);
  }
}

async function loadSearchData(keyword) {
  try {
    const res = await httpGet(
      `/products?populate=*&filters[$or][0][name][$contains]=${keyword}&filters[$or][1][description][$contains]=${keyword}`
    );
    products.value = res.data;
  } catch (error) {
    console.error(error);
  }
}

const fetchProductsByCategory = async (categoryId) => {
  try {
    let query = ''
    if (searchValue.value && searchValue.value != '') {
      query = `&filters[$or][0][name][$contains]=${searchValue.value}&filters[$or][1][description][$contains]=${searchValue.value}`
    }
    const res = await httpGet(
      `/products?populate=*&filters[categoryType][id][$in]=${categoryId}${query}`
    );
    products.value = res.data;
  } catch (error) {
    console.error(error);
  }
}


onLoad((options) => {
  if (options.keyword) {
    searchValue.value = options.keyword;
    loadSearchData(searchValue.value);
  } else if (options.categoryId) {
    categoryId.value = options.categoryId;
    fetchProductsByCategory(categoryId.value);
  }
})
</script>

<style lang="scss" scoped>
page {
  background-color: #F5F5F5;
}
</style>
