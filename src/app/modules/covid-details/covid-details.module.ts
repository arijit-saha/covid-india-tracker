import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { CovidDetailsRoutingModule } from './routes/covid-details-routing.module';
import { IndiaListComponent } from './components/india-list/india-list.component';

@NgModule({
  declarations: [IndiaListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CovidDetailsRoutingModule,
  ]
})
export class CovidDetailsModule { }
