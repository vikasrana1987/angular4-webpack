import { Component } from '@angular/core';

import { MAIN } from './shared/constant/main';
import { AuthenticationService } from './_services/index';

@Component({
    selector: 'app-main',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appBrand: string;

    constructor(
        public auth: AuthenticationService
    ) {
        this.auth = this.auth;
        this.appBrand = MAIN.APP.BRAND;
    }
}
