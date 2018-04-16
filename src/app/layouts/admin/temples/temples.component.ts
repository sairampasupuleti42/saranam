import { Component, OnInit } from '@angular/core';
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
  constructor(private _dataService: TempleService) {
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
  updateStatus(event, temple) {
    console.log('status changed !');
  }
  removeTemple(event, temple) {
    console.log('Temple Removed !' + temple.temple_id);

    if (confirm('Are you sure you want to delete ?')) {
      this._dataService.removeTemple(temple.temple_id).subscribe(templeRes => {
        this.res = templeRes.result;
         this.LoadTemples();
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
