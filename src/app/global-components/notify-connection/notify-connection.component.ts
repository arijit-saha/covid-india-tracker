import { DataShareService } from 'src/app/services/data-share.service';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notify-connection',
  templateUrl: './notify-connection.component.html',
  styleUrls: ['./notify-connection.component.scss'],
  animations: [
    // fade-in/fade-out animation
    trigger('fade', [
      // "in" style determines the "resting" state of the element when it is visible
      state('in', style({ opacity: 1 })),
      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [style({ opacity: 0 }), animate(200)]),
      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave', animate(200, style({ opacity: 0 })))
    ])
  ]
})
export class NotifyConnectionComponent implements OnInit, OnDestroy {

  _message: string;
  _eventType: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public _dataShare: DataShareService
  ) {
    // Adding event to track when the window have come Online
    window.addEventListener('online', () => {
      this._dataShare['showAlert'] = true;
      this._eventType = 'online';
      this._message = 'Internet Connected';
    });

    // Adding event to track when the window went Offline
    window.addEventListener('offline', () => {
      this._dataShare['showAlert'] = true;
      this._eventType = 'offline';
      this._message = 'Internet Connection Lost';
    });
  }

  ngOnInit(): void {}

  hideWindow(): void {
    if (this._eventType != '') {
      this._dataShare['showAlert'] = false;
    }
  }

  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
