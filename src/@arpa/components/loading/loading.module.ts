import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule,
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
})
export class LoadingModule {
}
