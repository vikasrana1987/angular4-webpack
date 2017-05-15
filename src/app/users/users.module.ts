import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AlertModule } from './../alert/alert.module';

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        AlertModule
    ],
    exports: [
        UsersComponent,
    ]
})
export class UsersModule {
}
