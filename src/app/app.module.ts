import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        HomeModule,
        LoginModule,
        AppRoutingModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
