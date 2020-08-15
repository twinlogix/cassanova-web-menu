import { SwiperModule } from 'ngx-swiper-wrapper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from '@components/categories/categories.component';
import { ProductsComponent } from '@components/products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';
import { NoHTMLPipe } from './no-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductDetailComponent } from '@components/product-detail/product-detail.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PageNotFoundComponent } from '@app/components/messages/page-not-found/page-not-found.component';
import { SearchProductsComponent } from '@components/search-products/search-products.component';
import { FormsModule } from '@angular/forms';
import { SalesPointComponent } from '@components/sales-point/sales-point.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';
import { MessageTemplateComponent } from './components/messages/message-template/message-template.component';
import { AuthFailedComponent } from './components/messages/auth-failed/auth-failed.component';
import { ServerErrorComponent } from './components/messages/server-error/server-error.component';
import { CassawebCarouselComponent } from './components/cassaweb-carousel/cassaweb-carousel.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { LineTruncationLibModule } from 'ngx-line-truncation';

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
    CassawebCarouselComponent,
  ],
  imports: [
    LineTruncationLibModule,
    VirtualScrollerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    ScrollingModule,
    FormsModule,
    SwiperModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
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
