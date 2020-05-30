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
  description?: string
}