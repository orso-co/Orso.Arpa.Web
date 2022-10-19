import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
  ],
  declarations: [ChartComponent],
  exports: [ChartComponent],
})
export class ChartModule {
}
