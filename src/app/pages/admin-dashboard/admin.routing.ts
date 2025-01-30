import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent
    }
];

export const AdminRoutes = RouterModule.forChild(routes);
