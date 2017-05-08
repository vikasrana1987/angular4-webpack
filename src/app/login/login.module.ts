import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        LoginRoutingModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule {
}
