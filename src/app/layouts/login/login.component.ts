import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import * as app from './../../global';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user: any;
  result: any;
  currentUser: {};
  token: {};
  loginFailed: Boolean = false;
  ErrorMsg: String;
  app_title = app.config.title;
  constructor(protected fb: FormBuilder, protected _dataService: UserService, protected _router: Router) {
    this.loginForm = fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
      ])
      ],
      'password': [null, Validators.required]
    });
    const token = localStorage.getItem('token');
    if (token === '') {
      this._router.navigate(['/login']);
    } else {
      this._router.navigate(['/dashboard']);
    }
  }
  login(loginData: any) {
    this._dataService.userAuthentication(loginData).subscribe(res => {
      if (res.status === 401) {
        this.loginFailed = true;
        this.ErrorMsg = ' Invalid email / password ';
      } else {
        localStorage.setItem('token', JSON.stringify(res.result.token));
        this._router.navigate(['/dashboard']);
      }
    });
  }
}
