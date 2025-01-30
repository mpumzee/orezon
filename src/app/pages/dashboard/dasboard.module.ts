import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminStatsComponent } from '../admin-stats/admin-stats.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { UsersComponent } from '../users/users.component';
import { DashboardRoutes } from './dashboard.routing';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutes,
        RouterModule,
        HttpClientModule,
        CurrencyPipe,
        DatePipe

    ],
    declarations: [
        UsersComponent,
        AdminStatsComponent,
        TransactionComponent

    ]
})
export class DashboardModule { }
