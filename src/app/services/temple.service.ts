import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Url } from 'url';
@Injectable()
export class TempleService {
  result: any;
  _url: String;
  _get: String;
  res: any;
  options: any;
  headers: any;
  constructor(private _http: Http) {
    this._url = 'http://bloomsandme.com/saranam/api/';
    this._get = 'get/temple/';
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.options = new RequestOptions({ headers: this.headers });
  }
  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Error on server occured');
  }
  getData(api: string) {
    return this._http.get(api).map(result => this.result = result.json());
  }
  getTempleCategories() {
    return this.getData(this._url + '' + this._get + 'category/list');
  }
  getTemples() {
    return this.getData(this._url + '' + this._get + 'list');
  }
  getTempleInfo(temple_id) {
    return this.getData(this._url + '' + this._get + '' + temple_id);
  }
  addTemple(temple) {
    const body = JSON.stringify(temple);
    return this._http.post(this._url + 'post/temple', body, this.options)
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }
  updateTemple(temple, temple_id) {
    return this._http.put(this._url + 'put/temple/' + temple_id, temple, this.options)
      .map(success => success.status)
      .catch(this._errorHandler);
  }
  removeTemple(temple_id) {
    return this._http.delete(this._url + 'delete/temple/' + temple_id).map((res: Response) => res.json());
  }
}
