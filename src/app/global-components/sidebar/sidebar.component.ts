import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  _isSidebarExpanded: boolean;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('sidebarRef') _sidebarRef: ElementRef;

  constructor(
    public _dataShare: DataShareService
  ) {}

  ngOnInit(): void {}

  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
