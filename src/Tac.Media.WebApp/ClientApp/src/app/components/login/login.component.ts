import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "@services/authentication/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });;
  submitClick = false;
  submitted = false;
  returnUrl?: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['redirect'] || '/';
  }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
      return;
    }

    this.submitClick = true;
    this.authenticationService.login(this.loginForm?.get("username")?.value, this.loginForm?.get("password")?.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.submitClick = false;
        });
  }
}
