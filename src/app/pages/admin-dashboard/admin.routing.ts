import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UsersComponent } from '../users/users.component';
import { OrdersComponent } from '../orders/orders.component';
import { CategoriesComponent } from '../categories/categories.component';
import { PackagesService, PaymentService } from '../../tools/services';
import { SellerPayoutsComponent } from '../seller-payouts/seller-payouts.component';


const routes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        children:[
            {
                path:'users',
                component:UsersComponent
            },
            {
                path:'orders',
                component:OrdersComponent
            },
            {
                path:'categories',
                component:CategoriesComponent
            },
            {
                path:'payments',
                component:PaymentService
            },
            {
                path:'packages',
                component:PackagesService
            },
            {
                path:'payouts',
                component:SellerPayoutsComponent
            },
            {
                path:'transactions',
                component:UsersComponent
            },
        ]
    },

];

export const AdminRoutes = RouterModule.forChild(routes);
