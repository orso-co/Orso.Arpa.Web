import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-select-dialog-view',
  templateUrl: './select-dialog-view.component.html',
  styleUrls: ['./select-dialog-view.component.scss'],
})
export class SelectDialogViewComponent {

  public options: SelectItem[];
  public selected: unknown;
  public ctx: unknown;

  constructor(private config: DynamicDialogConfig,
              public ref: DynamicDialogRef) {
    this.options = this.config.data.options;
    this.selected = this.config.data.selected;
    this.ctx = this.config.data.ctx;
  }

  onSelect(option: SelectItem) {
    this.selected = option.value;
    this.ref.close(option);
  }
}
