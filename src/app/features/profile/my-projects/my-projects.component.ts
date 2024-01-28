import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';
import { MeService, EnumService, NotificationsService, ProjectService } from '@arpa/services';
import { MyProjectParticipationDialogComponent } from './my-project-participation-dialog/my-project-participation-dialog.component';
import { MyProjectParticipationDto, MyProjectDto, AppointmentListDto, ProjectParticipationStatusResult } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'arpa-profile-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent {
  userProjects$: BehaviorSubject<MyProjectDto[]> = new BehaviorSubject<MyProjectDto[]>([]);
  totalRecordsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsPerPage = 25;
  selectOptions = [
    { id: false, name: 'OPEN_PROJECTS' },
    { id: true, name: 'ALL_PROJECTS' },
  ];
  selectedOption: boolean = false;
  appointmentMap: Map<string, Observable<AppointmentListDto[]>> = new Map();
  columns: ColumnDefinition<AppointmentListDto>[] = [
    { label: 'APPOINTMENT', property: 'name', type: 'text' },
    { label: 'BEGIN', property: 'startTime', type: 'date' },
    { label: 'END', property: 'endTime', type: 'date' },
    { label: 'CITY', property: 'city', type: 'text' },
    {
      label: 'STATUS',
      property: 'status',
      type: 'badge',
      badgeStateMap: [
        { label: 'appointmentStatus.CONFIRMED', value: 'CONFIRMED', severity: 'success' },
        { label: 'appointmentStatus.SCHEDULED', value: 'SCHEDULED', severity: 'info' },
        { label: 'appointmentStatus.AMBIGUOUS', value: 'AMBIGUOUS', severity: 'warning' },
        { label: 'appointmentStatus.AWAITING_POLL', value: 'AWAITING_POLL', severity: 'warning' },
      ],
    },
    { label: 'CATEGORY', property: 'category', type: 'text' },
  ];
  resultStatusConfig = new Map([
    [
      ProjectParticipationStatusResult.ACCEPTANCE,
      { label: 'projectParticipationStatusResult.ACCEPTANCE', severity: 'success', icon: 'pi pi-heart' },
    ],
    [
      ProjectParticipationStatusResult.REFUSAL,
      { label: 'projectParticipationStatusResult.REFUSAL', severity: 'info', icon: 'pi pi-info-circle' },
    ],
  ]);

  constructor(
    private meService: MeService,
    private enumService: EnumService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    private translate: TranslateService,
    private projectService: ProjectService
  ) {}

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
          .subscribe(
            () => {
              this.notificationsService.success('my-projects.SET_PARTICIPATION_STATUS', 'profile');
              this.reloadProjects();
            },
            () => {
              this.notificationsService.error('my-projects.SET_PARTICIPATION_STATUS_ERROR_422', 'profile');
            }
          );
      }
    });
  }

  loadData(take: number, skip: number): void {
    this.meService.getAllProjects(take, skip, this.selectedOption).subscribe((response) => {
      this.totalRecordsCount$.next(response.totalRecordsCount || 0);
      this.userProjects$.next(response.userProjects || []);
    });
  }

  reloadProjects(event?: { first: number; row: number }) {
    const take = event?.row ?? this.itemsPerPage;
    const skip = event?.first ?? 0;
    this.loadData(take, skip);
  }

  handleTabChange(event: { index: number }, projectId: string) {
    if (event.index === 2 && !this.appointmentMap.has(projectId)) {
      this.appointmentMap.set(projectId, this.projectService.getAppointmentsById(projectId));
    }
  }
}
