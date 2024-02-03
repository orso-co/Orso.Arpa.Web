import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnumService, AppointmentService } from '@arpa/services';
import {
  AppointmentListDto,
  AppointmentParticipationPrediction,
  AppointmentStatus,
  DateRange,
  MyAppointmentDto,
  ProjectDto,
} from '@arpa/models';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'arpa-my-appointments-widget',
  templateUrl: './appointments-widget.component.html',
  styleUrls: ['./appointments-widget.component.scss'],
})
export class AppointmentsWidgetComponent {
  appointments$: Observable<AppointmentListDto[]> = of([]);

  constructor(private router: Router, private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.get(DateRange.DAY, new Date());
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }

  showRibbon(appointmentStatus: AppointmentStatus): boolean {
    return [AppointmentStatus.AWAITING_POLL, AppointmentStatus.AMBIGUOUS].includes(appointmentStatus);
  }
  getRibbonContentKey(appointmentStatus: AppointmentStatus): string {
    const prefix = 'appointmentRibbon.';
    return `${prefix}${appointmentStatus}`;
  }

  onRowClick(event: any): void {
    this.router.navigate(['/arpa/profile/my-appointments']);
  }
}
