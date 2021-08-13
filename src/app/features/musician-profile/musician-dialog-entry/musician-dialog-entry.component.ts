import { Component } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from '../../../core/services/notifications.service';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { TranslateService } from '@ngx-translate/core';
import { MusicianLayoutComponent } from '../musician-layout/musician-layout.component';
import { first, map } from 'rxjs/operators';
import { LoggerService } from '../../../core/services/logger.service';
import { SectionDto } from '../../../model/sectionDto';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'arpa-musician-dialog-entry',
  template: '',
})
export class MusicianDialogEntryComponent {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private translate: TranslateService,
              private notificationsService: NotificationsService,
              private logger: LoggerService) {
    this.route.data.pipe(first()).subscribe((data) => {
      this.openDialog(data && !Array.isArray(data.musicianProfile) && data.musicianProfile);
    });
  }

  public openDialog(selection?: MusicianProfileDto) {
    // Filter sections against existing profiles but keep selected.
    const sections = combineLatest(
      this.route.data.pipe<SectionDto[]>(map((data) => data.sections)),
      this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles)),
    ).pipe(
      map(([sections, profiles]) => sections.filter(({ id }) => {
        return !(profiles.some(({ instrumentId }) =>
          selection ? instrumentId === id && instrumentId !== selection.instrumentId : instrumentId === id,
        ));
      })));

    const ref = this.dialogService.open(MusicianLayoutComponent, {
      data: {
        profile: new BehaviorSubject(selection),
        sections,
      },
      header: selection ? this.translate.instant('EDIT') : this.translate.instant('CREATE'),
      styleClass: 'form-modal',
    });

    ref.onClose
      .pipe(first())
      .subscribe((profile: MusicianProfileDto) => {
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
        );
      });
  }

}
