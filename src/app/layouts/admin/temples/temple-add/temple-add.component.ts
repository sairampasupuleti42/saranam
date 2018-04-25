import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  templeForm: FormGroup;
  fileToUpload: File = null;
  base64textString: any;
  reader: any;
  constructor(protected _dataService: TempleService, protected templeFB: FormBuilder, protected _location: Location) {
    this._dataService.getTempleCategories().subscribe(categories => {
      this.categories = categories.result;
    });
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
    this.templeForm.setValue({
      temple_image: this.base64textString
    });
  }

  saveTemple(templeData: any) {
    console.log(templeData);

    // this._dataService.addTemple(temple).subscribe((res: Response) => {
    //   this.response = res;
    //   this._location.back();
    // });
  }
  goBack() {
    this._location.back();
  }
}
