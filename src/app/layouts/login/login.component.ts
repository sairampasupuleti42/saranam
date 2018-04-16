import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, NgClass } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user: any;
  result: any;
  currentUser: {};
  token: {};
  constructor(private _dataService: UserService, protected _location: Location, protected _router: Router) {

  }
  ngOnInit() {
  }
  login(loginForm: NgForm) {
    const _form = loginForm.controls;
    const userForm = {
      'email': (_form.email.value !== ' ') ? _form.email.value : '',
      'password': (_form.password.value !== ' ') ? _form.password.value : ''
    };
    this._dataService.userAuthentication(userForm).subscribe(res => {
      localStorage.setItem('token', res.result.user_id);
      this._router.navigate(['/dashboard']);
    });
  }
}

