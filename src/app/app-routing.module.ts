import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SearchProductsComponent} from './search-products/search-products.component';
import {SalesPointComponent} from './sales-point/sales-point.component';

const routes: Routes = [
  { path: ':sp/:idSp/categories', component: CategoriesComponent },
  { path: ':sp/:idSp/categories/:id', component: ProductsComponent },
  { path: ':sp/:idSp/search', component: SearchProductsComponent },
  { path: ':sp/salespoint', component: SalesPointComponent},
  { path: 'error', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'error' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
