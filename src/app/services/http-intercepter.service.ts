import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable()
export class HttpIntercepterService implements HttpInterceptor {

  /**
   * This service can be used to intercept all HTTP requests.
   */

  constructor(
    private _httpErrorHandler: HttpErrorHandlerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req;

    return next.handle(modifiedRequest).pipe(tap(
      (event: HttpEvent<any>) => event,
      (error: HttpEvent<any>) => this._httpErrorHandler.errorHandler(error)
    ));
  }
}
