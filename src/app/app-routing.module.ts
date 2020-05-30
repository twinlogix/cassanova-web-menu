import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '@components/categories/categories.component';
import {ProductsComponent} from '@components/products/products.component';
import {PageNotFoundComponent} from '@components/page-not-found/page-not-found.component';
import {SearchProductsComponent} from '@components/search-products/search-products.component';
import {SalesPointComponent} from '@components/sales-point/sales-point.component';

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
