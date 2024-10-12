import type { Struct, Schema } from '@strapi/strapi'

export interface FieldPromotionComponent extends Struct.ComponentSchema {
  collectionName: 'components_field_promotion_components'
  info: {
    displayName: 'PromotionComponent'
  }
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'field.promotion-component': FieldPromotionComponent
    }
  }
}
