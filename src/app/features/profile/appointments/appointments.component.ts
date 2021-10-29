import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService } from '../../../shared/services/me.service';
import { MyAppointmentDto } from '../../../../@arpa/models/myAppointmentDto';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { RoomDto } from '../../../../@arpa/models/roomDto';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';

@Component({
  selector: 'arpa-profile-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements AfterViewInit {
  userAppointments$: Observable<MyAppointmentDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  predictions: Observable<SelectItem[]>;
  itemsPerPage = 10;

  constructor(
    private meService: MeService,
    private route: ActivatedRoute,
    private selectValueService: SelectValueService,
    private notificationsService: NotificationsService,
  ) {
  }

  ngAfterViewInit(): void {
    this.predictions = this.selectValueService.load('AppointmentParticipation', 'Prediction').pipe(
      map(() => this.selectValueService.get('AppointmentParticipation', 'Prediction')),
    );
  }

  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getMyAppointments(take, skip);
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
      .setAppointmentPrediction(event.ctx.id, event.value)
      .pipe(first())
      .subscribe(() => {
        event.ctx.predictionId = event.value;
        this.notificationsService.success('profile.PREDICTION_SET');
      });
  }
}
