import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  constructor(protected _router: Router) { }
 
  ngOnInit() {
    
    // if(!tokenexists){
    //    this._router.navigate(['/login']);
    // }
    let token=localStorage.getItem('token')
    if(token===''){
      this._router.navigate(['/login']);
    }
  }

}
