import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// import model
import { User } from '../_models/index';

import { AlertService, LoaderService, AuthenticationService, DomService } from '../_services/index';
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
   submitted: boolean;
   model: any = {};
   loading = false;
   returnUrl: string;

   constructor(private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private domService: DomService
  ) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.user = this.formBuilder.group({
      'email': ['', [<any>Validators.required,  <any>Validators.pattern(emailRegex) ]],
      'password': ['', Validators.required]
    });
    this.domService.addClass('body', ['login-page']);
  }

  ngOnInit() {
    this.submitted = false;
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnDestroy() {
      this.domService.removeClass('body', ['login-page']);
  }

  onSubmit(isFormValid: boolean, formData: User): void {
    this.submitted = true;
    if (isFormValid)  {
      this.loaderService.display(true);
     this.authenticationService.login(formData.email, formData.password)
        .subscribe(
            data => {
                this.loaderService.display(false);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error.message);
                this.loaderService.display(false);
            });
    }
  }
}
