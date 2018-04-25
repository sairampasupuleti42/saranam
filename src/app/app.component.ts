import { Component } from '@angular/core';
import * as app from './global';
declare var $;
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})

export class AppComponent {
  app_title = app.config.title;
  constructor() {
  }
}
