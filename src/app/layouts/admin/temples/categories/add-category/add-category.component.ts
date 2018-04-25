import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from './../../../../../services/category.service';
declare var $;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  submitted: Boolean = false;
  fileToUpload: File = null;
  base64textString: any;
  reader: any;
  result: any;
  constructor(private _dataService: CategoryService, protected fb: FormBuilder) {
    this.categoryForm = fb.group({
      'category_name': [null, Validators.compose([
        Validators.required
      ])
      ],
      'category_image': [null, Validators.required]
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
    this.categoryForm.setValue({
      category_image: this.base64textString,
      category_name: this.categoryForm.value.category_name
    });
  }
  removeJumbo() {
    this.submitted = false;
  }
  saveCategory(categoryData: any) {
    this.submitted = true;
    this._dataService.addCategory(categoryData)
      .subscribe(res => {
        this.result = res;
      });
    this.categoryForm.reset();
  }
}
