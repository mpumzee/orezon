import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AuthInterceptor } from '../auth/AuthInterceptor';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPaymentComponent } from './admin-payment/admin-payment.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrokerComponent } from './broker/broker.component';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { BuyerOrdersComponent } from './buyer-orders/buyer-orders.component';
import { BuyerPaymentComponent } from './buyer-payment/buyer-payment.component';
import { BuyerProfileComponent } from './buyer-profile/buyer-profile.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryShopComponent } from './category-shop/category-shop.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquipmentCategoriesComponent } from './equipment-categories/equipment-categories.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MetalsComponent } from './metals/metals.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrdersComponent } from './orders/orders.component';
import { PackagesComponent } from './packages/packages.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SelectPackageComponent } from './select-package/select-package.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { SellerPaymentsComponent } from './seller-payments/seller-payments.component';
import { SellerPayoutsComponent } from './seller-payouts/seller-payouts.component';
import { SellerTermsAndConditionsComponent } from './seller-terms-and-conditions/seller-terms-and-conditions.component';
import { SellerComponent } from './seller/seller.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SearchComponent,
    CategoriesComponent,
    ProductsComponent,
    LoginComponent,
    CategoryShopComponent,
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
    NavBarComponent,
    OrdersComponent,
    FooterComponent,
    RegisterComponent,
    EquipmentCategoriesComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    SellerTermsAndConditionsComponent,
    ContactUsComponent,
    AdminDashboardComponent,
    BuyerDashboardComponent,
    BuyerProfileComponent,
    SubCategoriesComponent,
    BuyerOrdersComponent,
    CartComponent,
    SellerOrdersComponent,
    UsersComponent,
    SellerPaymentsComponent,
    BuyerPaymentComponent,
    AdminPaymentComponent,
    SellerPayoutsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
