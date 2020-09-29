export enum Channel {
  RISTO = "RISTO",
  SALE = "SALE",
  ECOMMERCE = "ECOMMERCE",
  MOBILE_COMMERCE = "MOBILE_COMMERCE",
  SELF_ORDER = "SELF_ORDER",
  KIOSK = "KIOSK"
}

export const DEFAULT_START : number = 0;
export const DEFAULT_LIMIT : number = 10;
export const MAX_LIMIT = 100;
export const MIN_LIMIT = 1;

export interface CassaWebRequest {
  start?: number,
  limit?: number,
}

export interface CategoriesRequest extends CassaWebRequest {
  idsSalesPoint?: number[]
  ids?: string[],
  enabledForChannels?: Channel[]
}
  
export interface ProductsRequest extends CassaWebRequest {
  ids?: string[],
  idsSalesPoint?: number[],
  idsCategory?: string[],
  description?: string,
  enabledForChannels?: Channel[]
}

export interface StockRequest extends CassaWebRequest {
  sorts?: Sort[],
  idProduct?: string[],
  idProductVariant?: string[]
}

export interface Sort {
  key: string,
  direction: number
}