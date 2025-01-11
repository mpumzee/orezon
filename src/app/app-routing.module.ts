import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BrokerComponent } from './broker/broker.component';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CategoryShopComponent } from './category-shop/category-shop.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MetalsComponent } from './metals/metals.component';
import { PackagesComponent } from './packages/packages.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { SelectPackageComponent } from './select-package/select-package.component';
import { SellerTermsAndConditionsComponent } from './seller-terms-and-conditions/seller-terms-and-conditions.component';
import { SellerComponent } from './seller/seller.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { TopNavComponent } from './top-nav/top-nav.component';

const routes: Routes = [
  { path: '', component: TopNavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'metals', component: MetalsComponent },
  { path: 'broker', component: BrokerComponent },
  { path: 'buyer', component: BuyerComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'select-package', component: SelectPackageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'category-shop/:id', component: CategoryShopComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  {
    path: 'seller-terms-and-conditions',
    component: SellerTermsAndConditionsComponent,
  },
  {
    path: 'top-nav',
    component: TopNavComponent,
    children: [
      // { path: 'top-nav', component: TopNavComponent },
      { path: 'search', component: SearchComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
