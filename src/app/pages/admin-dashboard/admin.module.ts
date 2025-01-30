import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutes } from './admin.routing';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutes,
        RouterModule,
        HttpClientModule,

    ],
    declarations: [
        UsersComponent

    ]
})
export class AdminModule { }
