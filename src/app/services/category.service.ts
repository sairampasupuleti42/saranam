import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Url } from 'url';

@Injectable()
export class CategoryService {
  result: any;
  _url: String;
  res: any;
  options: any;
  headers: any;
  _get: any;
  constructor(private _http: Http) {
    this._url = 'http://bloomsandme.com/saranam/api/';
    this._get = 'get/temple/category/';
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.options = new RequestOptions({ headers: this.headers });
  }
  getCategories() {
    return this.getData(this._url + '' + this._get + 'list');
  }
  getCategoryInfo(category_id) {
    return this.getData(this._url + '' + this._get + category_id);
  }
  getData(api: string) {
    return this._http.get(api)
      .map(result => this.result = result.json());
  }
  addCategory(category) {
    const body = JSON.stringify(category);
    return this._http.post(this._url + 'post/temple/category', body, this.options)
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }
  removeCategory(category_id) {
    return this._http.delete(this._url + 'delete/temple/category/' + category_id).map((res: Response) => res.json());
  }
  updateCategory(category) {
    return this._http.put(this._url + 'put/temple/category/' + category.category_id, category, this.options)
      .map(success => success.status)
      .catch(this._errorHandler);
  }
  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Error on server occured');
  }
}

