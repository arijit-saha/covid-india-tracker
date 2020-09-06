import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService implements OnDestroy  {

  /**
   * This service can be used to share data across application.
   */

  showAlert = false;
  sidebarActive = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
