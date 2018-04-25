import { Component, OnInit } from '@angular/core';
import * as app from './../../../global';
declare var $;
@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {
  app_title = app.config.title;
  app_developer = app.config.developer;
  constructor() { }

  ngOnInit() {
  }

}
