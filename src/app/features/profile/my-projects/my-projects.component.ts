import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { first, map } from 'rxjs/operators';
import { MeService, EnumService, NotificationsService } from '@arpa/services';
import { MyProjectParticipationDialogComponent } from '../my-project-participation-dialog/my-project-participation-dialog.component';
import { MyProjectParticipationDto, MyProjectDto,  MyAppointmentListDto } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'arpa-profile-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit {
  myProjects: MyProjectDto[] = [];

  userProjects$: Observable<MyProjectDto[]> = of ([]);
  totalRecordsCount$: Observable<number> = of(0);
  itemsPerPage = 25;
  selectOptions = [
    { id: false, name: 'OPEN_PROJECTS' },
    { id: true, name: 'ALL_PROJECTS' },
  ];
  selectedOption: boolean = false;
  appointmentParticipations$: Observable<any>;
  columns: ColumnDefinition<MyAppointmentListDto>[] =[
    { label: 'APPOINTMENT', property: 'appointment.name', type: 'text' },
    { label: 'BEGIN', property: 'appointment.startTime', type: 'date' },
    { label: 'PREDICTION', property: 'appointmentParticipation.prediction', type: 'text' },
    { label: 'RESULT', property: 'appointmentParticipation.result', type: 'text' },
  ];

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
  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getAllProjects(take, skip, this.selectedOption);
    this.userProjects$ = loadResult$.pipe(map((result) => result || []));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result.length || 0));
  }

  onSelectedOptionChange(event: { value: number }) {
    this.loadData(this.itemsPerPage, 0);
  }
}
