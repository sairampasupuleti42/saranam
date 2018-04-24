import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
// import { Md5 } from 'ts-md5/dist/md5';
 import { UserService } from './../../services/user.service';

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
  loginFailed: Boolean =false;
  ErrorMsg:String;
  constructor(protected fb: FormBuilder,protected _dataService: UserService, protected _router: Router) {
    this.loginForm = fb.group({
      'email': [null, Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ],
      'password': [null, Validators.required]
    })
  }
  login(loginData: any) {
    this._dataService.userAuthentication(loginData).subscribe(res => {
      if(res.status==401){
        this.loginFailed=true;
        this.ErrorMsg=" Invalid email / password ";
      }else{
       // localStorage.setItem('token', res.result.user_id);
      // this._router.navigate(['/dashboard']);
      }
       
    });
  }
}

