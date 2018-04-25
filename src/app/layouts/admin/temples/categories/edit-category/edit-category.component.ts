import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from './../../../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  protected categoryForm: FormGroup;
  submitted: Boolean = false;
  fileToUpload: File = null;
  base64textString: any;
  reader: any;
  result: any;
  private sub: any;
  category: any;
  cat_img: any;
  category_id: any;
  types: any;
  status: number;
  constructor(private _dataService: CategoryService, private router: Router,
    private route: ActivatedRoute, protected fb: FormBuilder) {
    this.categoryForm = fb.group({
      'is_active': [null],
      'category_name': [null, Validators.compose([
        Validators.required
      ])
      ],
      'category_image': [null, Validators.required],

    });
    this.types = ['Inactive', 'Active'];
    this.sub = this.route.queryParams.subscribe(params => {
      const id = params['category_id'];
      this.category_id = id;
      if (id) {
        this._dataService.getCategoryInfo(id).subscribe(
          category => {
            this.category = category.result;
            this.categoryForm.patchValue({
              is_active: this.category.is_active,
              category_name: this.category.category_name,
              category_image: ''
            });
            this.cat_img = this.category.category_image;
          },
          error => console.log('Something went wrong'));
      }
    });
  }
  callType(value) {
    this.status = value;
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
    this.categoryForm.setValue({
      category_image: this.base64textString,
      category_name: this.categoryForm.value.category_name
    });
  }
  updateCategory(category: any) {
    this._dataService.updateCategory({
      'category_id': this.category_id,
      'category_name': category.category_name,
      'category_image': category.category_image,
      'is_active': category.is_active
    }).subscribe(categoryRes => {
      this.result = categoryRes;
      if (this.result === 200) {
        this.submitted = true;
      }
    });
  }
}

