import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CovidDetailsRoutingModule } from './routes/covid-details-routing.module';
import { IndiaListComponent } from './components/india-list/india-list.component';
import { DistrictWiseListComponent } from './components/state-wise-list/district-wise-list/district-wise-list.component';
import { StateWiseListComponent } from './components/state-wise-list/state-wise-list.component';

@NgModule({
  declarations: [IndiaListComponent, DistrictWiseListComponent, StateWiseListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CovidDetailsRoutingModule,
  ]
})
export class CovidDetailsModule { }
