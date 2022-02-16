import { PersonDto } from '../../../../@arpa/models/personDto';
import { PersonService } from '../../persons/services/person.service';
import { PersonLayoutComponent } from '../person-layout/person-layout.component';
import { Component } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from '../../../../@arpa/services/logger.service';

@Component({
  selector: 'arpa-person-dialog-entry',
  template: '',
})
export class PersonDialogEntryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private translate: TranslateService,
    private PersonService: PersonService,
    private notificationsService: NotificationsService,
    private logger: LoggerService
  ) {
    this.route.data.pipe(first()).subscribe((data) => {
      this.openDialog(data && data.person);
    });
  }

  public openDialog(selection?: PersonDto) {
    const person = new BehaviorSubject(selection);

    const ref = this.dialogService.open(PersonLayoutComponent, {
      data: {
        person,
      },
      header: `${this.translate.instant('PERSON')}: ${selection?.givenName}, ${selection?.surname}`,
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe((person: PersonDto) => {
      if (person && selection) {
        this.notificationsService.success('UPDATED');
        this.logger.info('update:', selection);
      } else if (person) {
        this.logger.info('created:', person);
        this.notificationsService.success('CREATED');
      }
      this.router.navigate([this.router.createUrlTree(['.'], { relativeTo: this.route }).root.children[PRIMARY_OUTLET].toString()], {
        state: { refresh: true },
      });
    });
  }
}
