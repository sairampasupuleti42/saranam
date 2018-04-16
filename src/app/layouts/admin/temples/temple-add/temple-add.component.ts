import { NgModule, Component, Pipe, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm, ControlValueAccessor } from '@angular/forms';
import { TempleService } from './../../../../services/temple.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-temple-add',
  templateUrl: './temple-add.component.html',
  styleUrls: ['./temple-add.component.css']
})
export class TempleAddComponent implements OnInit {
  categories: any;
  response: any;
  constructor(protected _dataService: TempleService, protected _location: Location) {
    this._dataService.getTempleCategories().subscribe(categories => {
      this.categories = categories.result;
    });
  }
  ngOnInit() {
  }
  saveTemple(tmplForm: NgForm) {
    const _form = tmplForm.controls;
    const temple = {
      'temple_name': (_form.temple_name.value !== ' ') ? _form.temple_name.value : '',
      'temple_category': (_form.temple_category.value !== ' ') ? _form.temple_category.value : '',
      'temple_deity': (_form.temple_deity.value !== ' ') ? _form.temple_deity.value : '',
      'temple_location': (_form.temple_location.value !== ' ') ? _form.temple_location.value : '',
      'temple_elevation': (_form.temple_elevation.value !== ' ') ? _form.temple_elevation.value : '',
      'temple_meaning': (_form.temple_meaning.value !== '') ? _form.temple_meaning.value : '',
      'temple_shilpa_shastra': (_form.temple_shilpa_shastra.value !== ' ') ? _form.temple_shilpa_shastra.value : '',
      'temple_sthala_purana': (_form.temple_sthala_purana.value !== ' ') ? _form.temple_sthala_purana.value : '',
      'temple_sevas_pujas': (_form.temple_sevas_pujas.value !== ' ') ? _form.temple_sevas_pujas.value : '',
      'temple_festivals_utsavs': (_form.temple_festivals_utsavs.value !== ' ') ? _form.temple_festivals_utsavs.value : '',
      'temple_interesting_facts': (_form.temple_interesting_facts.value !== ' ') ? _form.temple_interesting_facts.value : '',
      'temple_getting_there': (_form.temple_getting_there.value !== ' ') ? _form.temple_getting_there.value : '',
      'temple_places_nearby': (_form.temple_places_nearby.value !== ' ') ? _form.temple_places_nearby.value : '',
      'temple_visit_time': (_form.temple_visit_time.value !== ' ') ? _form.temple_visit_time.value : '',
      'temple_contact_info': (_form.temple_contact_info.value !== ' ') ? _form.temple_contact_info.value : ''
    };

     this._dataService.addTemple(temple).subscribe((res: Response) => {
       this.response = res;
       this._location.back();
     });
  }
  goBack() {
    this._location.back();
  }
}
