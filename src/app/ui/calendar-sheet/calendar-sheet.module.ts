import { PrimeNgModule } from './../../modules/prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarSheetComponent } from './calendar-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  declarations: [CalendarSheetComponent],
  exports: [CalendarSheetComponent]
})
export class CalendarSheetModule { }
