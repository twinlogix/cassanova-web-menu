import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './compoenents/categories/categories.component';
import {ProductsComponent} from './compoenents/products/products.component';
import {PageNotFoundComponent} from './compoenents/page-not-found/page-not-found.component';
import {SearchProductsComponent} from './compoenents/search-products/search-products.component';
import {SalesPointComponent} from './compoenents/sales-point/sales-point.component';

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
