import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { MetalsComponent } from './metals/metals.component';
import { BrokerComponent } from './broker/broker.component';
import { BuyerComponent } from './buyer/buyer.component';
import { PackagesComponent } from './packages/packages.component';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
  { path: '', component: TopNavComponent },
  { path: 'login', component: LoginComponent },
  {path: 'admin', component: AdminComponent},
  { path: 'metals', component: MetalsComponent },
  { path: 'broker', component: BrokerComponent },
  { path: 'buyer', component: BuyerComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'seller', component: SellerComponent },
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
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
