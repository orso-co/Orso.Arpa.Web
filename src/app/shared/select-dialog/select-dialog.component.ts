import { AfterViewInit, Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectDialogViewComponent } from './select-dialog-view.component';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-select-dialog',
  template: '',
})
export class SelectDialogComponent implements AfterViewInit {

  @Input() options: SelectItem[] = [];

  @Input() target: any;

  @Input() title: string;

  @Input() context: any = {};

  @Input() triggerEvent: string = 'click';

  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  triggerEventListener: any;

  constructor(private translateService: TranslateService, private dialogService: DialogService, public renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    if (this.target) {
      this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.openDialog();
      });
    }
  }

  public openDialog(selected: undefined | string = undefined, ctx: unknown = this.context) {
    const ref = this.dialogService.open(SelectDialogViewComponent, {
      data: {
        options: this.options,
        selected,
        ctx,
      },
      header: this.translateService.instant(this.title),
    });

    ref.onClose
      .pipe(first())
      .subscribe((result: SelectItem) => {
        if (result) {
          this.closeEvent.emit({ value: result.value, ctx });
        }
      });
  }
}
