import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorHandlerService } from 'src/app/services/http-error-handler.service';
import { HttpClientRequestService } from 'src/app/services/http-client-request.service';
import { ApiConfigService } from 'src/app/services/api-config.service';

@Component({
  selector: 'app-india-list',
  templateUrl: './india-list.component.html',
  styleUrls: ['./india-list.component.scss']
})
export class IndiaListComponent implements OnInit, OnDestroy {

  _totalCases: object;
  _stateWiseData: any;
  _selectedState: string;
  _stateDistrictData: any;
  _tableContainerHeight: number;
  _currentDisplayMode = 'state';
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  _displayedStateColumns = ['state', 'confirmed', 'recovered', 'deaths'];
  _displayedDistrictColumns = ['name', 'confirmed', 'recovered', 'deaths'];

  constructor(
    private _spinner: NgxSpinnerService,
    private _apiConfig: ApiConfigService,
    private _httpClient: HttpClientRequestService,
    private _httpError: HttpErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchTotalCases();
  }
  // Fetch Total Cases Data
  private fetchTotalCases(): void {
    this._httpClient.getRequest(this._apiConfig['API']['totalCases']).pipe(takeUntil(this._destroy$)).subscribe((response: any) => {
      if (response['state']) {
        this._totalCases = response;
        this.fetchStateWiseCases();
      } else {
        this._httpError.errorHandler({status: 400, message: 'No data found!'});
      }
    }, (error: any) => {
        this._spinner.hide();
        console.log('Error in fetchTotalCases!!');
        this._httpError.errorHandler(error);
    }, () => {});
  }
  // Fetch State Wise Cases Data
  private fetchStateWiseCases(): void {
    this._httpClient.getRequest(this._apiConfig['API']['stateData']).pipe(takeUntil(this._destroy$)).subscribe((response: any) => {
      if (response.length) {
        this._stateWiseData = response;
      } else {
        this._httpError.errorHandler({status: 400, message: 'No data found!!!!'});
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
    this._stateDistrictData = districtData;
    this._selectedState = selectedState;
    this._currentDisplayMode = 'district';
  }
  onBackButtonCLick(): void {
    this._currentDisplayMode = 'state';
    this._stateDistrictData = undefined;
  }
  // Unsubscribe from the subject itself
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
