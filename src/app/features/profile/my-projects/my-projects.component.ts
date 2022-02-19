import { TranslateService } from '@ngx-translate/core';
import { MyProjectParticipationDialogComponent } from './../my-project-participation-dialog/my-project-participation-dialog.component';
import { MyProjectParticipationDto } from './../../../../@arpa/models/myProjectDto';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService } from '../../../shared/services/me.service';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { MyProjectDto } from 'src/@arpa/models/myProjectDto';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'arpa-profile-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements AfterViewInit, OnInit {
  myProjects$: Observable<MyProjectDto[]> = of([]);
  participationStatusInner$: Observable<SelectItem[]>;

  constructor(
    private meService: MeService,
    private route: ActivatedRoute,
    private selectValueService: SelectValueService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.participationStatusInner$ = this.selectValueService
      .load('ProjectParticipation', 'ParticipationStatusInner')
      .pipe(map(() => this.selectValueService.get('ProjectParticipation', 'ParticipationStatusInner')));
  }

  ngOnInit(): void {
    this.myProjects$ = this.meService.getMyProjects();
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }

  onParticipationStatusChanged(event: any): void {
    this.meService
      .setProjectParticipationStatus(event.ctx.id, event.value)
      .pipe(first())
      .subscribe(() => {
        event.ctx.predictionId = event.value;
        this.notificationsService.success('profile.PROJECTPARTICIPATION_SET');
      });
  }

  openDialog(projectId: string, participation: MyProjectParticipationDto) {
    const ref = this.dialogService.open(MyProjectParticipationDialogComponent, {
      data: {
        participation,
        musicianProfiles: this.participationStatusInner$,
      },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe((result) => {
      if (result) {
        this.meService
          .setProjectParticipationStatus(projectId, result)
          .subscribe(() => this.notificationsService.success('projects.SET_PARTICIPATION_STATUS'));
      }
    });
  }
}
