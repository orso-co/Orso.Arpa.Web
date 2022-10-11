import { PersonDto } from '../../../../../@arpa/models/personDto';
import { PersonLayoutComponent } from '../person-layout/person-layout.component';
import { Component } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'arpa-person-dialog-entry',
  template: '',
})
export class PersonDialogEntryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {
    this.route.data.pipe(first()).subscribe((data) => {
      this.openDialog(data && data.person);
    });
  }

  public openDialog(selection?: PersonDto) {

    const ref = this.dialogService.open(PersonLayoutComponent, {
      data: {
        person: selection,
      },
      header: `${this.translate.instant('PERSON')}: ${selection?.givenName}, ${selection?.surname}`,
      styleClass: 'form-modal',
      dismissableMask: true,
    });

    ref.onClose.pipe(first()).subscribe((updateState: boolean) => {
      this.router.navigate([this.router.createUrlTree(['.'], { relativeTo: this.route }).root.children[PRIMARY_OUTLET].toString()], {
        state: { refresh: updateState },
      });
    });
  }
}
