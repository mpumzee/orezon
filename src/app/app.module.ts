import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SearchComponent } from './search/search.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient,  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MetalsComponent } from './metals/metals.component';
import { BrokerComponent } from './broker/broker.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PackagesComponent } from './packages/packages.component';
import { SellerComponent } from './seller/seller.component';
import { SelectPackageComponent } from './select-package/select-package.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthInterceptor } from '../auth/AuthInterceptor';
import { ProfileComponent } from './profile/profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SearchComponent,
    CategoriesComponent,
    ProductsComponent,
    LoginComponent,
    AdminComponent,
    MetalsComponent,
    BrokerComponent,
    BuyerComponent,
    PackagesComponent,
    SellerComponent,
    SelectPackageComponent,
    DashboardComponent,
    SignUpComponent,
    ProfileComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule     
  ],
  providers: [provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
