import { CommonModule } from '@angular/common';
import { SelectDialogComponent } from './select-dialog.component';
import { SelectDialogViewComponent } from './select-dialog-view.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SelectDialogComponent, SelectDialogViewComponent],
  imports: [CommonModule],
  providers: [DialogService],
  exports: [SelectDialogComponent, SelectDialogViewComponent],
})
export class SelectDialogModule {
}
