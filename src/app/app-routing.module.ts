import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '@components/categories/categories.component';
import {ProductsComponent} from '@components/products/products.component';
import {PageNotFoundComponent} from '@app/components/messages/page-not-found/page-not-found.component';
import {SearchProductsComponent} from '@components/search-products/search-products.component';
import {SalesPointComponent} from '@components/sales-point/sales-point.component';
import { TokenAuthGuard } from './guards/token-auth.guard';
import { AuthFailedComponent } from './components/messages/auth-failed/auth-failed.component';
import { ServerErrorComponent } from './components/messages/server-error/server-error.component';
import { ProductDetailComponent } from '@components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'salespoint', pathMatch: 'full'},
  { path: '404', component: PageNotFoundComponent},
  { path: '401', component: AuthFailedComponent},
  { path: '500', component: ServerErrorComponent},
  { path: 'salespoint', canActivate: [TokenAuthGuard], component: SalesPointComponent},
  {
    path: ':idSp',
    canActivateChild: [TokenAuthGuard],
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'search', component: SearchProductsComponent },
      { path: 'categories/:id', component: ProductsComponent },
      { path: 'categories/:idCat/:id', component: ProductDetailComponent},
      { path: '**', redirectTo: '/404'}
    ]
  },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
