import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { MeService, EnumService, NotificationsService } from '@arpa/services';
import { MyProjectParticipationDialogComponent } from '../my-project-participation-dialog/my-project-participation-dialog.component';
import { MyProjectParticipationDto, ProjectDto, MyProjectDto } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'arpa-profile-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit {
  myProjects: MyProjectDto[] = [];

  constructor(
    private meService: MeService,
    private enumService: EnumService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.meService.getMyProjects().subscribe((projects) => (this.myProjects = projects));
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
        statusOptions$: this.enumService.getProjectParticipationStatusInnerSelectItems(),
      },
      header: this.translate.instant('profile.my-projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 350 ? '350px' : '100%',
    });

    ref.onClose.pipe(first()).subscribe((result) => {
      if (result) {
        this.meService
          .setProjectParticipationStatus(projectId, { ...result, musicianProfileId: participation.musicianProfile?.id })
          .subscribe((updatedParticipation) => {
            this.notificationsService.success('projects.SET_PARTICIPATION_STATUS');
            this.myProjects = this.myProjects.map((myProject) => {
              if (myProject.project.id !== projectId) {
                return myProject;
              }
              return {
                ...myProject,
                participations: myProject.participations.map((p) => {
                  if (p.musicianProfile.id !== participation.musicianProfile.id) {
                    return p;
                  }
                  return updatedParticipation;
                }),
              };
            });
          });
      }
    });
  }
}
