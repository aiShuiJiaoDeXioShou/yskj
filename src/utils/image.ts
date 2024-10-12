const baseUrl = import.meta.env.VITE_STATIC_BASEURL

// 获取 Strapi 中图片的工具函数// 获取 Strapi 中图片的工具函数
export function getStrapiImage(imageData) {
  try {
    // 判断imageData 如果是对象且不为数组就直接返回url路径
    if (typeof imageData === 'object' && !Array.isArray(imageData)) {
      return baseUrl + imageData.url
    }

    // 确保返回的数据中包含图片信息
    if (imageData && Array.isArray(imageData)) {
      if (imageData.length === 1) {
        console.log('imageData:', baseUrl + imageData[0].url)
        // 如果只有一个图片，返回单个 URL
        return baseUrl + imageData[0].url
      } else {
        // 如果有多个图片，返回 URL 数组
        return imageData.map((image) => baseUrl + image.url)
      }
    } else {
      throw new Error('没有找到图片数据')
    }
  } catch (error) {
    console.error('解析图片数据失败:', error)
    return null
  }
}
