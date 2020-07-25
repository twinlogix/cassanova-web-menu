import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from '@components/categories/categories.component';
import { ProductsComponent } from '@components/products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TokenInterceptor } from './services/token-interceptor';
import { NoHTMLPipe } from './no-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductDetailComponent } from '@components/product-detail/product-detail.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from '@app/components/messages/page-not-found/page-not-found.component';
import { SearchProductsComponent } from '@components/search-products/search-products.component';
import {FormsModule} from '@angular/forms';
import { SalesPointComponent } from '@components/sales-point/sales-point.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { MessageTemplateComponent } from './components/messages/message-template/message-template.component';
import { AuthFailedComponent } from './components/messages/auth-failed/auth-failed.component';
import { ServerErrorComponent } from './components/messages/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    NoHTMLPipe,
    ProductDetailComponent,
    PageNotFoundComponent,
    SearchProductsComponent,
    SalesPointComponent,
    NavBarComponent,
    MessageTemplateComponent,
    AuthFailedComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
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
      },
      {
        provide: DEFAULT_CURRENCY_CODE,
        useValue: 'EUR'
      }
  ],
  entryComponents: [
    ProductDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
