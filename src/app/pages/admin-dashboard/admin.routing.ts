import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UsersComponent } from '../users/users.component';


const routes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        children:[
            {
                path:'users',
                component:UsersComponent
            }
        ]
    },
    
];

export const AdminRoutes = RouterModule.forChild(routes);
