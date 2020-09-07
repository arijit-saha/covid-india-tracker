import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'covid-list',
    loadChildren: () => import('../modules/covid-details/covid-details.module').then(module => module.CovidDetailsModule)
  },
  {
    path: '',
    redirectTo: 'covid-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'covid-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload', scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
