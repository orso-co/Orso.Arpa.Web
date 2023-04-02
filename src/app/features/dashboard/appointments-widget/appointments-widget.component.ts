import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MeService } from '@arpa/services';
import { MyAppointmentDto, ProjectDto, RoomDto } from '@arpa/models';

@Component({
  selector: 'arpa-appointments-widget',
  templateUrl: './appointments-widget.component.html',
  styleUrls: ['./appointments-widget.component.scss'],
})
export class AppointmentsWidgetComponent {
  userAppointments$: Observable<MyAppointmentDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  totalRecordsCountMissingPrediction$: Observable<number> = of(0);
  itemsPerPage = 8;

  constructor(private meService: MeService, private cdRef: ChangeDetectorRef) {}

  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getMyAppointments(take, skip);
    this.userAppointments$ = loadResult$.pipe(map((result) => result?.userAppointments || []));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result?.totalRecordsCount || 0));
    this.totalRecordsCountMissingPrediction$ = loadResult$.pipe(
      map((result) => result?.userAppointments?.filter((appointment) => !!appointment && !appointment.prediction).length ?? 0)
    );
    this.cdRef.detectChanges();
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }

  getRoomNames(rooms: RoomDto[]): string {
    return rooms.map((r) => r.name).join(', ');
  }
}
