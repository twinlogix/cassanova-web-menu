import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: '/:sp/categories', redirectTo: 'categories', pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: ProductsComponent },
  { path: '**',  redirectTo: 'error'},
  { path: 'error', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
