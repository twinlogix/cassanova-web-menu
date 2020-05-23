import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './compoenents/categories/categories.component';
import { ProductsComponent } from './compoenents/products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TokenInterceptor } from './services/token-interceptor';
import { NoHTMLPipe } from './no-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatListModule, MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';
import { ProductDetailComponent } from './compoenents/product-detail/product-detail.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from './compoenents/page-not-found/page-not-found.component';
import { SearchProductsComponent } from './compoenents/search-products/search-products.component';
import {FormsModule} from '@angular/forms';
import { SalesPointComponent } from './compoenents/sales-point/sales-point.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    NoHTMLPipe,
    ProductDetailComponent,
    PageNotFoundComponent,
    SearchProductsComponent,
    SalesPointComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    ScrollingModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
      {
        provide: MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: { hasBackdrop: false }
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
  ],
  entryComponents: [
    ProductDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
