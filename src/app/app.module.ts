import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TokenInterceptor } from './token-interceptor';
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
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import {FormsModule} from '@angular/forms';
import { SalesPointComponent } from './sales-point/sales-point.component';

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
