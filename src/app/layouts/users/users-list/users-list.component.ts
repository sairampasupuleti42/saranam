import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any;
  uu:any;
  constructor(protected _dataService: UserService, protected _router: Router) {
    this._dataService.getUsers().subscribe(response => {
      if (response.status === 200) {
        this.users = response.result;
        //console.log(this.users);
      }
    });
	this._dataService.getMLabData().subscribe(response => {
      this.uu=response;
      
    });
  }

  ngOnInit() {
  }

}
