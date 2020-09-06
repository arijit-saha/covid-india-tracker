import { IndiaListComponent } from './../components/india-list/india-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'india',
    component: IndiaListComponent,
  },
  {
    path: '',
    redirectTo: 'india',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'india',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovidDetailsRoutingModule { }
