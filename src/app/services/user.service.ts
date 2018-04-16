import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Url } from 'url';

@Injectable()
export class UserService {
  _url: any;
  headers: any;
  options: any;

  result: any;
  constructor(private _http: Http) {
    this._url = 'http://bloomsandme.com/saranam/api/';
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.options = new RequestOptions({ headers: this.headers });
  }
  userAuthentication(user) {
    const body = JSON.stringify(user);
    return this._http.post(this._url + 'login', body, this.options)
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }
  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Error on server occured');
  }
}
