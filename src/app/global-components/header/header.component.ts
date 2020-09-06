import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void { }

  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
