import { IndiaListComponent } from './../components/india-list/india-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateWiseListComponent } from '../components/state-wise-list/state-wise-list.component';
import { DistrictWiseListComponent } from '../components/state-wise-list/district-wise-list/district-wise-list.component';

const routes: Routes = [
  {
    path: 'india',
    component: IndiaListComponent,
  },
  {
    path: 'state-list',
    component: StateWiseListComponent,
  },
  {
    path: 'district-list/:district',
    component: DistrictWiseListComponent,
  },
  {
    path: '',
    redirectTo: 'state-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'state-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidDetailsRoutingModule { }
