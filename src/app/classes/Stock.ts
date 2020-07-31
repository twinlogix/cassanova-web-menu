export interface Stock {
    idProduct :	string,         //Id of the product.
    idProductVariant : string,  //Id of the variant if the product is ‘multivariant’.
    manageStock : boolean,      //If set to false it’s not possible to create movements for product and it’s stock quantity will not be traced.
    warningLevel : number,      //Defines the quantity under which the product should be replenished.
    incomingQuantity : number,  //Incoming quantity
    outgoingQuantity : number,  //Outgoing quantity
    quantity : number,          //Product stock quantity.
}
  