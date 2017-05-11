import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AlertModule } from './../alert/alert.module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        AlertModule
    ],
    exports: [
        DashboardComponent,
    ]
})
export class DashboardModule {
}
