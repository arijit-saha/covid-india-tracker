import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  /**
   * This service can be used to handle API errors.
   */

  constructor() { }

  errorHandler(errorResponse: any): void {
    console.log('errorResponse', errorResponse);
    switch (errorResponse['status']) {
      case 400:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || '400 error',
          icon: 'error',
        });
        break;
      case 401:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || '401 error',
          icon: 'error',
        });
        break;
      case 403:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || '403 error',
          icon: 'error',
        });
        break;
      case 404:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || '404 error',
          icon: 'error',
        });
        break;
      case 422:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || '422 error',
          icon: 'error',
        });
        break;
      case 423:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || '423 error',
          icon: 'error',
        });
        break;
      case 500:
        Swal.fire({
          title: 'Oops',
          text: errorResponse['message'] || 'Something went wrong!',
          icon: 'error',
        });
        break;
      default:
        Swal.fire({
          title: 'Oops',
          text: 'There seems to be an error. Please try again. If the problem persists, reach out to the support team.',
          icon: 'error',
        });
    }
  }

}
