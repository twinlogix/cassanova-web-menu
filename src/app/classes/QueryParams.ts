export interface CategoriesRequest {
  start?: number,
  limit?: number,
  idsSalesPoint?: number[]
  ids?: string[],
}
  
export interface ProductsRequest {
  start?: number,
  limit?: number,
  ids?: string[],
  idsSalesPoint?: number[],
  idsCategory?: string[],
  description?: string,
  enabledForChannels?: Channel[]
}

export interface StockRequest {
  start?: number,
  limit?: number,
  sorts?: Sort[],
  idProduct?: string[],
  idProductVariant?: string[]
}

export enum Channel {
  RISTO = "RISTO",
  SALE = "SALE",
  ECOMMERCE = "ECOMMERCE",
  MOBILE_COMMERCE = "MOBILE_COMMERCE",
  SELF_ORDER = "SELF_ORDER",
  KIOSK = "KIOSK"
}

export interface Sort {
  key: string,
  direction: number
}