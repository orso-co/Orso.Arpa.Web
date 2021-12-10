import { PersonDto } from './../../../../@arpa/models/personDto';
import { PersonService } from './../../persons/services/person.service';
import { PersonLayoutComponent } from '../person-layout/person-layout.component';
import { Component } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { first, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { LoggerService } from '../../../../@arpa/services/logger.service';

@Component({
  selector: 'arpa-person-dialog-entry',
  template: '',
})
export class PersonDialogEntryComponent {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private translate: TranslateService,
              private PersonService: PersonService,
              private notificationsService: NotificationsService,
              private logger: LoggerService) {
    this.route.data.pipe(first()).subscribe((data) => {
      this.openDialog(data && !Array.isArray(data.selectedProfile) && data.selectedProfile);
    });
  }

  public openDialog(selection?: PersonDto) {

    const profile = new BehaviorSubject(selection);


    const ref = this.dialogService.open(PersonLayoutComponent, {
      data: {
        profile,
        isMe: this.route.snapshot.url.length > 1 && this.route.snapshot.url[0].path === 'me',
      },
      header: selection ? this.translate.instant('EDIT') : this.translate.instant('CREATE'),
      styleClass: 'form-modal',
    });

    ref.onClose
      .pipe(first())
      .subscribe((profile: PersonDto) => {
        if (profile && selection) {
          this.notificationsService.success('UPDATED');
          this.logger.info('update:', selection);
        } else if (profile) {
          this.logger.info('created:', profile);
          this.notificationsService.success('CREATED');
        }
        this.router.navigate(
          [this.router
            .createUrlTree(['.'], { relativeTo: this.route })
            .root.children[PRIMARY_OUTLET].toString()],
          { state: { refresh: true } },
        );
      });
  }

}
