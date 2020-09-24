import { Category } from '@classes/Category'
import { Price } from '@classes/Price';
import { ProductImage } from '@classes/ProductImage';

export interface Product {
  id : string,
  description :	string, //name
  descriptionLabel : string,
  descriptionExtended :	string, //descr
  idDepartment : string,
  // department 	Department 	Related department which define tax fee on product.
  idCategory : string,
  category : Category,
  // icon 	String 	Optional value. Product icon id. See icons for a list of possible values.
  // soldByWeight 	Boolean 	If set to true, the price is determined by the amount (weight) of product sold.
  // defaultTare 	Long 	If set, this value specify the product default tare weight.
  // multivariant 	Boolean 	If set to true, the product allows variants. See ProductVariant for more details.
  // color 	String 	Product color, expressed as hexadecimal value, show on button background on selling interface.
  // enableForRisto 	Boolean 	If set to true, this product is available for the restaurant interface.
  // enableForSale 	Boolean 	If set to true, this product is available for sale on Cassa In Cloud app.
  // enableForECommerce 	Boolean 	If set to true, this product is available for sale on e-commerce.
  // enableForMobileCommerce 	Boolean 	If set to true, this product is available for sale on mobile e-commerce.
  // enableForSelfOrderMenu 	Boolean 	If set to true, this product is available for sale on Cassa In Cloud self order app.
  // enableForKiosk 	Boolean 	If set to true, this product is available for sale on Cassa In Cloud kiosk app.
  // tags 	List[String] 	Used to group and to help searching products.
  // descriptionReceipt 	String 	Description shown on receipt. If ‘multivariant’ is set to true, the receipt description is taken from product variant. It’s recommended to not use special characters as some printers may not recognize them.
  // internalId 	String 	If ‘multivariant’ is set to true, the internal id is taken from product variant.
  // barcodes 	List[Barcode] 	List of barcodes that identify product. If ‘multivariant’ is set to true, the barcodes are taken from product variant.
  // alternatives 	List[String] 	List of ID of alternative products.
  // costs 	List[Cost] 	List of costs.
  // relateds 	List[String] 	List of ID of related products.
  // variants 	List[ProductVariant] 	Product variants. Only set if ‘multivariant’ is true.
  // attributes 	List[Attribute] 	List of all available attributes for the product.
  // modifiers 	List[Modifier] 	List of all available modifier for the product.
  prices : Price[],
  basePrice : Price,
  images : ProductImage[],
  // externalId 	String 	externalId.
  idSalesPoint : number,
  // lastUpdate 	Timestamp 	lastUpdate.
}
