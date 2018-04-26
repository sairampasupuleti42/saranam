import { Component, OnInit, Compiler, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from './../../../../../services/category.service';
import { CommonModule, Location, NgClass } from '@angular/common';
import { FormsModule, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

declare var $;
declare var require: any;
declare var alertify: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  form: FormGroup;
  categories: Array<any>;
  res: any;
  result: any;
  succMsg: boolean;
  btnStatus: any;
  hideRow: Boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private _dataService: CategoryService, protected router: Router, private _compiler: Compiler) {
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

  editCategory(event, category) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'category_id': category.category_id
      }
    };

    this.router.navigate(['/category/edit'], navigationExtras);
  }
  removeCategory(event, category, i) {
    this.hideRow = true;
    if (confirm('Are you sure you want to delete ?')) {
      this.categories.splice(i, 1);
      this._dataService.removeCategory(category.category_id).subscribe(categoryRes => {
        this.res = categoryRes.result;
        this.refresh();
      });
    }
  }
}
