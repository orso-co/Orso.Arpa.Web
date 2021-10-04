import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { ChartThemeService } from './chart-theme.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
  ],
  declarations: [ChartComponent],
  providers: [ChartThemeService],
  exports: [ChartComponent],
})
export class ChartModule {
}
