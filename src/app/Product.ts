export class Product {
  id: string;
  name: string; /* Description */
  description: string; /* Description Extended */
  price: number;
  imageUrls: string[];
  imageIndex = 0;
  constructor(id: string, name: string, description: string, price: number, imagesUrls: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrls = imagesUrls;
  }
}
