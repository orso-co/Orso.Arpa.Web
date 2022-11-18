import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService, NotificationsService, EnumService } from '@arpa/services';
import { MyAppointmentDto, ProjectDto, RoomDto } from '@arpa/models';
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
    { id: false, name: 'FUTURE_APPOINTMENTS'},
    { id: true, name: 'PAST_APPOINTMENTS'}
  ]
  selectedOption: boolean = false;
  predictions$: Observable<SelectItem[]>;

  constructor(
    private meService: MeService,
    private notificationsService: NotificationsService,
    private enumService: EnumService
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

  onPredictionChanged(event: any): void {
    this.meService
      .setAppointmentPrediction(event.ctx.id, { prediction: event.value.value })
      .pipe(first())
      .subscribe(() => {
        event.ctx.prediction = event.value.value;
        this.notificationsService.success('profile.PREDICTION_SET');
      });
  }

  onSelectedOptionChange(event: {value: number}) {
    this.loadData(this.itemsPerPage, 0);
  }
}
