import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  errorSession = false;
  formLogin:FormGroup = new FormGroup({});
  constructor(private asAuthService: AuthService, private cookie: CookieService, private route: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    })
  }

  sendLogin(): void {
    const { email,password } = this.formLogin.value;
    this.asAuthService.sendCredentials(email,password).subscribe(responseOk => {
      console.log("Session iniciada");
      const { tokenSession,data } = responseOk;
      this.cookie.set('token',tokenSession, 4, '/');
      this.route.navigate(['/','tracks'])
    },
    err => {
      this.errorSession = true;
      console.log("Error", err);
    });
  }

}
