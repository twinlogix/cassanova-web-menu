export interface Category {
  id: string,
  description: string,
  externalId: string,
  enableForRisto: boolean,
  enableForSale: boolean,
  enableForECommerce: boolean,
  enableForMobileCommerce: boolean,
  enableForSelfOrderMenu: boolean,
  enableForKiosk: boolean,
  idSalesPoint: number,
  // lastUpdate 	Timestamp 	lastUpdate.
  // modifiers 	List[Modifier] 	A collection of modifiers available to all category products.
  imageUrl: string;
}
