import { Component, OnInit, Compiler, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from './../../../../../services/category.service';
import { CommonModule, Location, NgClass } from '@angular/common';
import { FormsModule, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  form: FormGroup;
  categories: Array<any>;
  res: any;
  result: any;
  succMsg: boolean;
  btnStatus: any;
  hideRow: boolean;
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

  updatecategory(event, category) {

  }
  updateStatus() {

  }
  removeCategory() {

  }
}
