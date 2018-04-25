import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as app from './../../../global';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

export class AdminHeaderComponent implements OnInit {
  app_title = app.config.title;
  constructor(protected _router: Router) { }

  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token === '') {
      this._router.navigate(['/login']);
    }
  }

}
