import { DataShareService } from 'src/app/services/data-share.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteConfigLoadStart, Router, RouterEvent, Scroll } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _swUpdate: SwUpdate,
    private _spinner: NgxSpinnerService,
    public _dataShare: DataShareService,
  ) { }

  ngOnInit(): void {
    // Reload the app when new version is available
    if (this._swUpdate['isEnabled']) {
      this._swUpdate['available'].pipe(takeUntil(this._destroy$)).subscribe(res => {
        if (confirm('New version is available. Load New Version!!')) {
          window.location.reload();
        }
      });
    }

    /**
     * On slow connection when application loads or user switches between routes,
     * show loader for proper interaction
     */
    this._router.events.pipe(takeUntil(this._destroy$)).subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        this._spinner.show();
      }
    });
  }

  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
