import { Component, OnInit, Compiler, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from './../../../../../services/category.service';
import { CommonModule, Location, NgClass } from '@angular/common';
import { FormsModule, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $;

export class Category {
  category_name: string;
  category_image: string | any;
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  form: FormGroup;
  categories: Array<any>;
  category: Category;
  res: any;
  result: any;
  succMsg: boolean;
  btnStatus: any;
  hideRow: boolean;
  submitted: boolean;
  fileToUpload: File = null;
  base64textString: any;
  reader: any;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private _dataService: CategoryService, protected _location: Location, private _compiler: Compiler) {
    this.refresh();
    this.succMsg = false;
    this.hideRow = false;
    this._compiler.clearCache();
  }
  refreshTable(time) {
    setTimeout(function () {
      $('#dtable').DataTable();
    }, time);
  }
  ngOnInit() {
    this.submitted = false;
    this.category = new Category();
  }

  LoadCategories() {
    this.categories = [];
    this.categories.length = 0;
    this._dataService.getCategories().subscribe(categories => {
      this.categories = categories.result;
    });
  }
  refresh() {
    this.LoadCategories();
    this.refreshTable(700);
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
    // console.log(btoa(binaryString));
  }
  saveCategory(FormElements: NgForm) {
    console.log(FormElements);
    this.category = {
      category_name: '',
      category_image: this.reader
    };
    console.log(JSON.stringify(this.category));
    this.submitted = true;
  }
  updatecategory(event, category) {

  }
  updateStatus() {

  }
  removeCategory() {

  }
}
