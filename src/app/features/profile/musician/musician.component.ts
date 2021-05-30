import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMusicianProfileDto } from '../../../models/appointment';
import { MeService } from '../../../core/services/me.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EditMusicianProfileComponent } from '../edit-musician-profile/edit-musician-profile.component';
import { ISectionDto } from '../../../models/section';
import { LoggerService } from '../../../core/services/logger.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss'],
})
export class MusicianComponent {

  public profiles: Observable<IMusicianProfileDto[]>;
  public sections: Observable<ISectionDto[]>;

  constructor(
    private route: ActivatedRoute,
    private meService: MeService,
    private dialogService: DialogService,
    private notificationsService: NotificationsService,
    private translate: TranslateService,
    private logger: LoggerService) {
    this.profiles = this.route.data.pipe<IMusicianProfileDto[]>(map((data) => data.profiles));
    this.sections = this.route.data.pipe<ISectionDto[]>(map((data) => data.sections));
  }

  public openDialog(selection?: IMusicianProfileDto) {
    const ref = this.dialogService.open(EditMusicianProfileComponent, {
      data: {
        profile: selection,
        sections: this.sections,
      },
      header: selection ? this.translate.instant('mupro.EDIT') : this.translate.instant('mupro.CREATE')
    });

    ref.onClose
      .pipe(first())
      .subscribe((profile: IMusicianProfileDto) => {
        if (profile && selection) {
          this.notificationsService.success('mupro.UPDATED');
          this.logger.info('update:', selection);
        } else if (profile) {
          this.create(profile);
        }
      });
  }

  getSection(profile: IMusicianProfileDto) {
    return this.sections.pipe(
      map((sections: ISectionDto[]) => sections
        .find(section => section.id === profile.instrumentId)?.name,
      ),
    );
  }

  create(profile: IMusicianProfileDto): void {
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
