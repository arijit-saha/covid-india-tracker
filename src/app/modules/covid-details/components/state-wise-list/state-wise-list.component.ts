import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorHandlerService } from 'src/app/services/http-error-handler.service';
import { HttpClientRequestService } from 'src/app/services/http-client-request.service';
import { ApiConfigService } from 'src/app/services/api-config.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-state-wise-list',
  templateUrl: './state-wise-list.component.html',
  styleUrls: ['./state-wise-list.component.scss'],
})
export class StateWiseListComponent implements OnInit, OnDestroy {

  _totalCases: object;
  _stateWiseData: any;
  _selectedState: string;
  _stateDistrictData: any;
  _tableContainerHeight: number;
  _currentDisplayMode = 'state';
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  _displayedStateColumns = ['state', 'confirmed', 'recovered', 'deaths'];

  constructor(
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _apiConfig: ApiConfigService,
    private _httpClient: HttpClientRequestService,
    private _httpError: HttpErrorHandlerService,
    private _dataShare: DataShareService
  ) { }

  ngOnInit(): void {
    this._spinner.show();
    this.fetchTotalCases();
  }
  // Fetch Total Cases Data
  private fetchTotalCases(): void {
    this._httpClient.getRequest(this._apiConfig['API']['totalCases']).pipe(takeUntil(this._destroy$)).subscribe((response: any) => {
      if (response['state']) {
        // this._totalCases = response;
        this._totalCases = {
          confirmed: {
            cases: response['confirmed'],
            text: 'Confirmed',
            headerBg: '#fef5f4',
            footerBg: '#fbd6d7',
            color: '#d45e62',
          },
          recovered: {
            cases: response['recovered'],
            text: 'Recovered',
            headerBg: '#f1fdf4',
            footerBg: '#c8f5d6',
            color: '#459d69',
          },
          deaths: {
            cases: response['deaths'],
            text: 'Deaths',
            headerBg: '#edf2f6',
            footerBg: '#e0e7ef',
            color: '#85919f',
          },
          keys: ['confirmed', 'recovered', 'deaths']
        };
        this.fetchStateWiseCases();
      } else {
        this._httpError.errorHandler({ status: 400, message: 'No data found!' });
      }
    }, (error: any) => {
      this._spinner.hide();
      console.log('Error in fetchTotalCases!!');
      this._httpError.errorHandler(error);
    }, () => { });
  }
  // Fetch State Wise Cases Data
  private fetchStateWiseCases(): void {
    this._httpClient.getRequest(this._apiConfig['API']['stateData']).pipe(takeUntil(this._destroy$)).subscribe((response: any) => {
      if (response.length) {
        this._stateWiseData = response;
      } else {
        this._httpError.errorHandler({ status: 400, message: 'No data found!!!!' });
      }
    }, (error: any) => {
      this._spinner.hide();
      console.log('Error in fetchStateWiseCases!!');
      this._httpError.errorHandler(error);
    }, () => {
      this._spinner.hide();
    });
  }
  // On State click
  onStateClick(districtData: Array<any>, selectedState: string): void {
    this._spinner.show();
    this._dataShare['shareDistrictData'] = districtData;
    this._router.navigate(['covid-list/district-list/' + selectedState]);
  }
  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
