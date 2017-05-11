import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AlertModule } from './../alert/alert.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        AlertModule
    ],
    exports: [
        LoginComponent,
    ]
})
export class LoginModule {
}
