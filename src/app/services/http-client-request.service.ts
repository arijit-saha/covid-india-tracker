import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientRequestService {

  /**
   * This service can be used to call APIs using following functions.
   */

  constructor(
    public _httpClient: HttpClient
  ) { }

  getRequest(url: any, queryParams?: HttpParams): Observable<any> {
    return this._httpClient.get(this.constructFullAPI(url), { params: queryParams });
  }

  postRequest(url: any, params?: any, queryParams?: HttpParams): Observable<any> {
    return this._httpClient.post(this.constructFullAPI(url), params, { params: queryParams });
  }

  putRequest(url: any, params?: any, queryParams?: HttpParams): Observable<any> {
    return this._httpClient.put(this.constructFullAPI(url), params, { params: queryParams });
  }

  patchRequest(url: any, params?: any, queryParams?: HttpParams): Observable<any> {
    return this._httpClient.patch(this.constructFullAPI(url), params, { params: queryParams });
  }

  deleteRequest(url: any, params?: any): Observable<any> {
    return this._httpClient.delete(this.constructFullAPI(url), params);
  }

  constructFullAPI(url: any): string {
    return environment['apiEndPoint'] + url;
  }

}
