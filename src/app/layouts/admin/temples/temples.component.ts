import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TempleService } from './../../../services/temple.service';
declare var $;
@Component({
  selector: 'app-temples',
  templateUrl: './temples.component.html',
  styleUrls: ['./temples.component.css']
})
export class TemplesComponent implements OnInit {
  temples: Array<any>;
  res: any;
  constructor(private _dataService: TempleService, private router: Router) {
    this.refresh();
  }
  refreshTable(time) {
    setTimeout(function () {
      $('#dtable').DataTable();
    }, time);
  }
  ngOnInit() {
  }
  LoadTemples() {
    this._dataService.getTemples().subscribe(temples => {
      this.temples = temples.result;
    });
  }
  editTemple(event, temple) {
    this.router.navigate(['/temple/edit/' + temple.temple_id]);
  }
  removeTemple(event, temple) {
    if (confirm('Are you sure you want to delete ?')) {
      this._dataService.removeTemple(temple.temple_id).subscribe(templeRes => {
        this.res = templeRes.result;
        this.refresh();
        $('#dtable').each(function () {
          const dt = $(this).dataTable();
          dt.fnDraw();
        });
      });
    }
  }
  refresh() {
    this.refreshTable(700);
    this.LoadTemples();
  }
}
