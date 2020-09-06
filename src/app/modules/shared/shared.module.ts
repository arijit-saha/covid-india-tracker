import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { MaterialModule } from './../ui-library/material/material.module';

@NgModule({
  declarations: [SanitizePipe, SortPipe],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule
  ],
  exports: [
    NgxSpinnerModule,
    MaterialModule,
    SanitizePipe,
    SortPipe
  ]
})
export class SharedModule { }
