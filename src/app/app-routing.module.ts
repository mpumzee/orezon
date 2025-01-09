import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { BrokerComponent } from './broker/broker.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CategoryShopComponent } from './category-shop/category-shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MetalsComponent } from './metals/metals.component';
import { PackagesComponent } from './packages/packages.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { SelectPackageComponent } from './select-package/select-package.component';
import { SellerComponent } from './seller/seller.component';
import { SignUpComponent } from './sign-up/sign-up.component';
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
  { path: 'about-us', component: AboutUsComponent },
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
export class AppRoutingModule {}
