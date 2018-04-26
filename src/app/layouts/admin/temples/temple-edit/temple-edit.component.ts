import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlSegment, Router, UrlSegmentGroup, UrlTree } from '@angular/router';
import { TempleService } from './../../../../services/temple.service';

@Component({
  selector: 'app-temple-edit',
  templateUrl: './temple-edit.component.html',
  styleUrls: ['./temple-edit.component.css']
})
export class TempleEditComponent implements OnInit {
  href: any;
  temple_id: any;
  temple: any;
  submitted: Boolean = false;
  templeForm: FormGroup;
  fileToUpload: File = null;
  base64textString: any;
  reader: any;
  temp_img: any;
  categories: any;
  temple_image: any;
  status: any;
  constructor(protected router: Router, protected _location: Location,
    protected templeFB: FormBuilder, protected _dataService: TempleService) {

    this.templeForm = templeFB.group({
      'temple_name': [null, Validators.compose([Validators.required])],
      'temple_category': [null, Validators.compose([Validators.required])],
      'temple_image': [null, Validators.compose([Validators.required])],
      'temple_deity': [null, Validators.compose([Validators.required])],
      'temple_elevation': [null, Validators.compose([Validators.required])],
      'temple_visit_time': [null, Validators.compose([Validators.required])],
      'temple_meaning': [null, Validators.compose([Validators.required])],
      'temple_shilpa_shastra': [null, Validators.compose([Validators.required])],
      'temple_sthala_purana': [null, Validators.compose([Validators.required])],
      'temple_sevas_pujas': [null, Validators.compose([Validators.required])],
      'temple_festivals_utsavs': [null, Validators.compose([Validators.required])],
      'temple_interesting_facts': [null, Validators.compose([Validators.required])],
      'temple_location': [null, Validators.compose([Validators.required])],
      'temple_getting_there': [null, Validators.compose([Validators.required])],
      'temple_places_nearby': [null, Validators.compose([Validators.required])],
      'temple_contact_info': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.temple_id = this.router.url.split('/')[3];
    this._dataService.getTempleInfo(this.temple_id).subscribe(response => {
      this.temple = response.result;
      this.temp_img = this.temple.temple_image;
      this.templeForm.patchValue({
        'temple_name': this.temple.temple_name,
        'temple_category': this.temple.temple_category,
        'temple_image': '',
        'temple_deity': this.temple.temple_deity,
        'temple_elevation': this.temple.temple_elevation,
        'temple_visit_time': this.temple.temple_visit_time,
        'temple_meaning': this.temple.temple_meaning,
        'temple_shilpa_shastra': this.temple.temple_shilpa_shastra,
        'temple_sthala_purana': this.temple.temple_sthala_purana,
        'temple_sevas_pujas': this.temple.temple_sevas_pujas,
        'temple_festivals_utsavs': this.temple.temple_festivals_utsavs,
        'temple_interesting_facts': this.temple.temple_interesting_facts,
        'temple_location': this.temple.temple_location,
        'temple_getting_there': this.temple.temple_getting_there,
        'temple_places_nearby': this.temple.temple_places_nearby,
        'temple_contact_info': this.temple.temple_contact_info
      });
    });
    this._dataService.getTempleCategories().subscribe(categories => {
      this.categories = categories.result;
    });
  }

  fileUploader(evt) {
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      this.reader = new FileReader();
      this.reader.onload = this._handleReaderLoaded.bind(this);
      this.reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.temple_image = this.base64textString;
    this.templeForm.patchValue({
      'temple_name': this.temple.temple_name,
      'temple_category': this.temple.temple_category,
      'temple_image': this.temple_image,
      'temple_deity': this.temple.temple_deity,
      'temple_elevation': this.temple.temple_elevation,
      'temple_visit_time': this.temple.temple_visit_time,
      'temple_meaning': this.temple.temple_meaning,
      'temple_shilpa_shastra': this.temple.temple_shilpa_shastra,
      'temple_sthala_purana': this.temple.temple_sthala_purana,
      'temple_sevas_pujas': this.temple.temple_sevas_pujas,
      'temple_festivals_utsavs': this.temple.temple_festivals_utsavs,
      'temple_interesting_facts': this.temple.temple_interesting_facts,
      'temple_location': this.temple.temple_location,
      'temple_getting_there': this.temple.temple_getting_there,
      'temple_places_nearby': this.temple.temple_places_nearby,
      'temple_contact_info': this.temple.temple_contact_info
    });
  }
  callType(value) {
    this.status = value;
  }
  updateTemple(templeData: any) {
    console.log(templeData);
  }
  goBack() {
    this._location.back();
  }

}
