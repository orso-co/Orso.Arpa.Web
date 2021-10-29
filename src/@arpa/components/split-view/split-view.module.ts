import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitViewComponent } from './split-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [SplitViewComponent],
  exports: [SplitViewComponent],
})
export class SplitViewModule {
}
