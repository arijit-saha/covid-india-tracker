import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataForwardService {

  /**
   * This service can be used to forward late subscribed data.
   */

  _forwardDataTo = new BehaviorSubject({});
  fetchForwardedData$ = this._forwardDataTo.asObservable();

  constructor() { }

  forwardData(_data): void {
    this._forwardDataTo.next(_data);
  }

}
