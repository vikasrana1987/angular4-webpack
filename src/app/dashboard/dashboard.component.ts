import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// import model
import { User } from '../_models';

import { AlertService, AuthenticationService, DomService } from '../_services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
    currentUser: User;
    constructor(private router: Router,
        private authenticationService: AuthenticationService,
        private domService: DomService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser === null) { this.router.navigateByUrl('/login'); }
    }

    ngOnInit() {
       this.domService.addClass('body', ['skin-blue', 'sidebar-mini']);
    }
    ngOnDestroy() {
        this.domService.removeClass('body', ['skin-blue', 'sidebar-mini']);
    }
}
