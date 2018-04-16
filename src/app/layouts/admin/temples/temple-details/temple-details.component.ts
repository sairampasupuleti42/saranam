import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Routes, RouterModule, Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { TempleService } from './../../../../services/temple.service';
@Component({
  selector: 'app-temple-details',
  templateUrl: './temple-details.component.html',
  styleUrls: ['./temple-details.component.css']
})
export class TempleDetailsComponent implements OnInit {
  temple: any;
  constructor(private _dataService: TempleService, private route: ActivatedRoute,
    private router: Router, private _location: Location) {
    route.url.subscribe((s: UrlSegment[]) => {
      this._dataService.getTempleInfo(s[2].path).subscribe(temple => {
        this.temple = temple.result;
        console.log(this.temple);
      });
    });
  }
  goBack() {
    this._location.back();
  }
  ngOnInit() {

  }

}
