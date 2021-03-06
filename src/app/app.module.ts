import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from './alert/alert.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';
import { AppComponent } from './app.component';

// Project Service Imports
import { AuthGuard } from './_guards/index';
import { AlertService, LoaderService, AuthenticationService, UserService, DomService } from './_services/index';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
        AlertModule,
        HomeModule,
        LoginModule,
        DashboardModule,
        UsersModule,
        AppRoutingModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        LoaderService,
        AuthenticationService,
        UserService,
        DomService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
