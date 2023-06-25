import { Component } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService, LoggerService } from '@arpa/services';
import { MusicianProfileDto, SectionDto } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { MusicianLayoutComponent } from '../musician-layout/musician-layout.component';
import { first, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { MusicianService } from '../services/musician.service';

@Component({
  selector: 'arpa-musician-dialog-entry',
  template: '',
})
export class MusicianDialogEntryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private translate: TranslateService,
    private musicianService: MusicianService,
    private notificationsService: NotificationsService,
    private logger: LoggerService
  ) {
    this.route.data.pipe(first()).subscribe((data) => {
      this.openDialog(data && !Array.isArray(data.selectedProfile) && data.selectedProfile);
    });
  }

  public openDialog(selection?: MusicianProfileDto) {
    // Filter sections against existing profiles but keep selected.
    const sections = combineLatest([
      this.route.data.pipe<SectionDto[]>(map((data) => data.sections)),
      this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles)),
    ]).pipe(
      map(([sections, profiles]) =>
        sections.filter(({ id }) => {
          return !profiles.some(({ instrument }) =>
            selection ? instrument!.id === id && instrument!.id !== selection.instrument!.id : instrument!.id === id
          );
        })
      )
    );

    const profile = new BehaviorSubject(selection);

    // Fetch doubling instruments for current main instrument.
    const doublingInstruments = profile.pipe(
      map((value) => value as MusicianProfileDto),
      switchMap((currentProfile: MusicianProfileDto) => {
        if (currentProfile) {
          return this.musicianService.getDoublingInstruments(currentProfile.instrument?.id);
        } else {
          return of();
        }
      })
    );

    const ref = this.dialogService.open(MusicianLayoutComponent, {
      data: {
        profile,
        sections,
        doublingInstruments,
        isMe: this.route.snapshot.url.length > 1 && this.route.snapshot.url[0].path === 'me',
        personId: this.route.snapshot.params?.personId,
        comboInstrumentView: this.route.snapshot.queryParamMap.get('comboInstruments') || false,
      },
      header: selection ? this.translate.instant('EDIT') : this.translate.instant('CREATE'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });

    ref.onClose.pipe(first()).subscribe((profile: MusicianProfileDto) => {
      this.router.navigate([this.router.createUrlTree(['.'], { relativeTo: this.route }).root.children[PRIMARY_OUTLET].toString()], {
        state: { refresh: true },
      });
    });
  }
}
