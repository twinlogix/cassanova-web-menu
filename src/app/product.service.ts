import { Injectable } from '@angular/core';
import { Product } from './Product';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {TokenService} from './token.service';
import {HttpUtils} from './HttpUtils';

const requestUrl = HttpUtils.HOSTNAME + '/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCTS: Map<string, Product[]>;

  constructor(private token: TokenService) {
    this.initMap();
  }

  getProducts(categoryId: string): Observable<Product[]> {
    return of(this.PRODUCTS.get(categoryId));
  }

  initMap(): void {

    this.PRODUCTS = new Map<string, Product[]>();

    this.PRODUCTS.set('1', [
      { id: '1', name: 'Caprese', description: 'Pomodoro, Mozzarella di Bufala, Insalata, Origano', price: 7.80, imageUrls: ['/assets/hamburger.jpg'] },
      { id: '2', name: 'Mortadella', description: 'Mortadella', price: 6.00, imageUrls: ['/assets/paninoMortadella.jpg'] },
      { id: '3', name: 'Cotoletta', description: 'Cotoletta, Mayonnaise', price: 7.00, imageUrls: ['/']}
    ]);

    this.PRODUCTS.set('2', [
      { id: '1', name: 'Margherita', description: 'Pomodoro, Mozzarella', price: 5.30, imageUrls: ['/'] },
      { id: '2', name: 'Salsiccia', description: 'Pomodoro, Mozzarella, Salsiccia', price: 6.60, imageUrls: ['/'] },
      { id: '3', name: 'Tonno e Cipolla', description: 'Pomodoro, Mozzarella, Tonno, Cipolla', price: 7.00, imageUrls: ['/']  }
    ]);

    this.PRODUCTS.set('3', [
      { id: '1', name: 'Passatelli al Tartufo', description: 'Passatelli, Tartufo, Crema di Funghi', price: 12.00, imageUrls: ['/'] },
      { id: '2', name: 'Tagliatelle al Ragù', description: 'Tagliatelle, Ragù', price: 7.50, imageUrls: ['/'] }
    ]);
  }
}
