import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MeService } from '../../../core/services/me.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EditMusicianProfileComponent } from '../edit-musician-profile/edit-musician-profile.component';
import { LoggerService } from '../../../core/services/logger.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { SectionDto } from '../../../model/sectionDto';

@Component({
  selector: 'arpa-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss'],
})
export class MusicianComponent {

  public profiles: Observable<MusicianProfileDto[]>;
  public sections: Observable<SectionDto[]>;

  constructor(
    private route: ActivatedRoute,
    private meService: MeService,
    private dialogService: DialogService,
    private notificationsService: NotificationsService,
    private translate: TranslateService,
    private logger: LoggerService) {
    this.profiles = this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles));
    this.sections = this.route.data.pipe<SectionDto[]>(map((data) => data.sections));
  }

  public openDialog(selection?: MusicianProfileDto) {
    const ref = this.dialogService.open(EditMusicianProfileComponent, {
      data: {
        profile: selection,
        sections: this.sections,
      },
      header: selection ? this.translate.instant('mupro.EDIT') : this.translate.instant('mupro.CREATE')
    });

    ref.onClose
      .pipe(first())
      .subscribe((profile: MusicianProfileDto) => {
        if (profile && selection) {
          this.notificationsService.success('mupro.UPDATED');
          this.logger.info('update:', selection);
        } else if (profile) {
          this.create(profile);
        }
      });
  }

  getSection(profile: MusicianProfileDto) {
    return this.sections.pipe(
      map((sections: SectionDto[]) => sections
        .find(section => section.id === profile.instrumentId)?.name,
      ),
    );
  }

  create(profile: MusicianProfileDto): void {
    this.meService.putProfileMusician(profile)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('mupro.CREATED');
        this.profiles = this.meService.getProfileMusician() as any;
      });
  }

  update() {

  }

}
