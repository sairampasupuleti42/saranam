import { Component, OnInit, Compiler } from '@angular/core';
import { CategoryService } from './../../../../../services/category.service';
import { CommonModule, Location, NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Array<any>;
  category: any;
  res: any;
  result: any;
  succMsg: boolean;
  btnStatus: any;
  hideRow: boolean;

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
  saveCategory(category: NgForm) {
    let result;
    const _form = category.controls;
    const categoryVar = {
      'category_name': (_form.category_name.value !== ' ') ? _form.category_name.value : ''
    };
    this._dataService.addCategory(categoryVar)
      .subscribe(res => {
        result = res;
        this.categories.push({
          category_id: result.category_id,
          category_name: result.category_id,
          is_active: result.is_active,
        });
      });
    this.succMsg = true;
    setTimeout(function () {
      this.succMsg = false;
    }, 1500);
    setTimeout(function () {
      $('.modal').modal('hide');
    }, 2000);
    this.refresh();
  }
  updateStatus($event, category) {
    this.btnStatus = (category.is_active === '1') ? true : false;
    this._dataService.updateCategory({
      'category_id': category.category_id,
      'category_name': category.category_name,
      'is_active': (category.is_active === '1') ? '0' : '1'
    }).subscribe(categoryRes => {
      this.res = categoryRes.result;
      this.refresh();
    });
  }
  // updateCategory($event, category) {
  //   this._dataService.updateCategory({
  //     'category_id': category.category_id,
  //     'category_name': category.category_name
  //   }).subscribe(categoryRes => {
  //     this.res = categoryRes.result;
  //     setTimeout(function () {
  //       $('.modal').modal('hide');
  //     }, 2000);
  //     this.refresh();
  //   });
  // }
  updateCategory(category: NgForm) {
    console.log(category);
    const _form = category.controls;
    const categoryVar = {
      'category_name': (_form.category_name.value !== ' ') ? _form.category_name.value : '',
      'category_id': _form.category_id.value
    };
    console.log(_form);
    this._dataService.updateCategory(categoryVar).subscribe(categoryRes => {
      this.res = categoryRes.result;
      setTimeout(function () {
        $('.modal').modal('hide');
      }, 2000);
      this.refresh();
    });
    this.succMsg = true;
    setTimeout(function () {
      this.succMsg = false;
    }, 1500);
    setTimeout(function () {
      $('.modal').modal('hide');
    }, 2000);
    this.refresh();
  }
  removeCategory($event, category) {
    this.hideRow = true;
    if (confirm('Are you sure you want to delete ?')) {
      this._dataService.removeCategory(category.category_id).subscribe(categoryRes => {
        this.res = categoryRes.result;
      });
      this.refresh();
    }
  }
  refresh() {
    this.LoadCategories();
    this.refreshTable(700);
  }
  edit($event, category) {
    this._dataService.getCategoryInfo(category.category_id).subscribe(categories => {
      this.category = categories.result;
    });
  }
}
