import { Component, OnInit } from '@angular/core';

import { MAIN } from './shared/constant/main';
import { AuthenticationService, LoaderService } from './_services';

@Component({
    selector: 'app-main',
    templateUrl: 'app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})
export class AppComponent implements OnInit {
    public appBrand: string;
    showLoader: boolean;

    constructor(
        public auth: AuthenticationService,
        private loaderService: LoaderService
    ) {
        this.auth = this.auth;
        this.appBrand = MAIN.APP.BRAND;
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}
