import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Routes, RouterModule, Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { DashboardService } from './../../../services/dashboard.service';
export class Counts {
  temples_count: string;
  poojas_count: string;
  pandits_count: string;
  users_count: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  currentUser: any;
  counts: Counts;
  test: string;
  constructor(private _dataService: DashboardService, private route: ActivatedRoute,
    private router: Router, private _location: Location) {
    route.url.subscribe((s: UrlSegment[]) => {
      this._dataService.getDashboardStats().subscribe(counts => {
        this.counts = counts.result;
      });
    });
  }
  goBack() {
    this._location.back();
  }

  ngOnInit() {

  }

}
