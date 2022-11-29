import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService, NotificationsService, EnumService } from '@arpa/services';
import { AppointmentParticipationPrediction, AppointmentStatus, MyAppointmentDto, ProjectDto, RoomDto } from '@arpa/models';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-profile-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  userAppointments$: Observable<MyAppointmentDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  itemsPerPage = 25;
  selectOptions = [
    { id: false, name: 'FUTURE_APPOINTMENTS' },
    { id: true, name: 'PAST_APPOINTMENTS' },
  ];
  selectedOption: boolean = false;
  predictions$: Observable<SelectItem[]>;

  constructor(private meService: MeService, private notificationsService: NotificationsService, private enumService: EnumService) {
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

  onPredictionChanged(event: { ctx: MyAppointmentDto; value: AppointmentParticipationPrediction }): void {
    this.meService
      .setAppointmentPrediction(event.ctx.id, { prediction: event.value })
      .pipe(first())
      .subscribe(() => {
        event.ctx.prediction = event.value;
        this.notificationsService.success('profile.PREDICTION_SET');
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
      return "warning";
    }
    return "primary";
  }
}
