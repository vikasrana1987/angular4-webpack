import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// import model
import { User } from '../_models/index';

import { AlertService, AuthenticationService } from '../_services/index';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
    currentUser: User;
    constructor(private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser === null) { this.router.navigateByUrl('/login'); }
    }
}
