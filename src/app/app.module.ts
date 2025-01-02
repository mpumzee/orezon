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
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MetalsComponent } from './metals/metals.component';
import { BrokerComponent } from './broker/broker.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PackagesComponent } from './packages/packages.component';
import { SellerComponent } from './seller/seller.component';
import { SelectPackageComponent } from './select-package/select-package.component';

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
    SelectPackageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule     
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
