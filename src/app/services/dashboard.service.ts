import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Url } from 'url';

@Injectable()
export class DashboardService {

  result: any;
  _url: String;
  _get: String;
  res: any;
  options: any;
  headers: any;
  constructor(private _http: Http) {
    this._url = 'http://bloomsandme.com/saranam/api/';
    this._get = 'dashboard';
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
  getDashboardStats() {
    return this.getData(this._url + '' + this._get);
  }

}
