import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// import model
import { User } from '../_models/index';

import { AlertService, AuthenticationService } from '../_services/index';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
   user: FormGroup;
   bodyClasses: String = 'login-page';
   submitted: boolean;
   model: any = {};
   loading = false;
   returnUrl: string;

   constructor(private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.user = this.formBuilder.group({
      'email': ['', [<any>Validators.required,  <any>Validators.pattern(emailRegex) ]],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.submitted = false;
    // $('body').addClass(this.bodyClasses);
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy() {
      // $('body').removeClass(this.bodyClasses);
  }

  onSubmit(isFormValid: boolean, formData: User): void {
    this.submitted = true;
    if (isFormValid)  {
     this.loading = true;
     this.authenticationService.login(formData.email, formData.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error.message);
                this.loading = false;
            });
    }
  }
}
