import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-district-wise-list',
  templateUrl: './district-wise-list.component.html',
  styleUrls: ['./district-wise-list.component.scss'],
})
export class DistrictWiseListComponent implements OnInit, OnDestroy {

  _stateDistrictData: any;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  _displayedDistrictColumns = ['name', 'confirmed', 'recovered', 'deaths'];

  constructor(
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _dataShare: DataShareService
    ) {
      window.scroll(0, 0);
    }

  ngOnInit(): void {
    setTimeout(() => {
      this._spinner.hide();
      if (!this._dataShare['shareDistrictData']) {
        this._router.navigateByUrl('state-list');
      }
      this._stateDistrictData = this._dataShare['shareDistrictData'];
    }, 500);
  }
  onBackButtonCLick(): void {
    this._spinner.show();
    this._stateDistrictData = undefined;
    this._router.navigateByUrl('state-list');
  }
  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
