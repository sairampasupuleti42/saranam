import { Component, OnInit, Compiler, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from './../../../../../services/category.service';
import { FormsModule, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
export class Category {
  category_name: string;
  category_image: string | any;
}
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category: Category;
  submitted: boolean;
  fileToUpload: File = null;
  base64textString: any;
  reader: any;
  cateForm: FormGroup;
  result: any;
  constructor(private _dataService: CategoryService, protected _location: Location, private _compiler: Compiler) {
    this._compiler.clearCache();
  }
  ngOnInit() {
    this.submitted = false;
    this.category = new Category();
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
    this.category.category_image = btoa(binaryString);
  }
  saveCategory(categoryForm: NgForm) {
    const _form = categoryForm.controls;
    console.log(_form);
    this.category = {
      category_name: _form.category_name.value,
      category_image: _form.category_image.value
    };
    this.submitted = true;
    this._dataService.addCategory(this.category)
      .subscribe(res => {
        this.result = res;
      });
  }
}
