import { TranslateService } from '@ngx-translate/core';
import { MyAppointmentParticipationDialogComponent } from '../my-appointment-participation-dialog/my-appointment-participation-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService, NotificationsService, EnumService } from '@arpa/services';
import { AppointmentParticipationPrediction, AppointmentStatus, MyAppointmentDto, ProjectDto, RoomDto } from '@arpa/models';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-profile-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent {
  userAppointments$: Observable<MyAppointmentDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  itemsPerPage = 25;
  selectOptions = [
    { id: false, name: 'FUTURE_APPOINTMENTS' },
    { id: true, name: 'PAST_APPOINTMENTS' },
  ];
  selectedOption: boolean = false;
  predictions$: Observable<SelectItem[]>;

  constructor(
    private meService: MeService,
    private notificationsService: NotificationsService,
    private enumService: EnumService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {
    this.predictions$ = this.enumService.getAppointmentParticipationPredictionSelectItems();
  }

  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getMyAppointments(take, skip, this.selectedOption);
    this.userAppointments$ = loadResult$.pipe(map((result) => result.userAppointments || []));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result.totalRecordsCount || 0));
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }

  getRoomNames(rooms: RoomDto[]): string {
    return rooms.map((r) => r.name).join(', ');
  }

  openPredictionDialog(myAppointmentDto: MyAppointmentDto) {
    const ref = this.dialogService.open(MyAppointmentParticipationDialogComponent, {
      data: {
        participation: { prediction: myAppointmentDto.prediction, commentByPerformerInner: myAppointmentDto.commentByPerformerInner },
        statusOptions$: this.predictions$,
      },
      header: this.translate.instant('profile.my-my-appointments.EDIT_PREDICTION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 350 ? '350px' : '100%',
    });

    ref.onClose.pipe(first()).subscribe((result) => {
      if (result) {
        this.meService
          .setAppointmentPrediction(myAppointmentDto.id, result)
          .pipe(first())
          .subscribe(() => {
            myAppointmentDto.prediction = result.prediction;
            myAppointmentDto.commentByPerformerInner = result.commentByPerformerInner;
            this.notificationsService.success('profile.PREDICTION_SET');
          });
      }
    });
  }

  onSelectedOptionChange(event: { value: number }) {
    this.loadData(this.itemsPerPage, 0);
  }

  showRibbon(appointmentStatus?: AppointmentStatus): boolean {
    if (!appointmentStatus) {
      return false;
    }
    return [AppointmentStatus.AWAITING_POLL, AppointmentStatus.AMBIGUOUS].includes(appointmentStatus);
  }

  getRibbonContentKey(appointmentStatus: AppointmentStatus, appointmentPrediction?: AppointmentParticipationPrediction): string {
    const prefix = 'appointmentRibbon.';
    if (
      appointmentStatus === AppointmentStatus.AWAITING_POLL &&
      (!appointmentPrediction || appointmentPrediction === AppointmentParticipationPrediction.DONT_KNOW_YET)
    ) {
      return `${prefix}POLL_MISSING`;
    }
    return `${prefix}${appointmentStatus}`;
  }

  getRibbonSeverity(appointmentStatus: AppointmentStatus, appointmentPrediction?: AppointmentParticipationPrediction) {
    if (
      appointmentStatus === AppointmentStatus.AWAITING_POLL &&
      (!appointmentPrediction || appointmentPrediction === AppointmentParticipationPrediction.DONT_KNOW_YET)
    ) {
      return 'warning';
    }
    return 'primary';
  }
}
