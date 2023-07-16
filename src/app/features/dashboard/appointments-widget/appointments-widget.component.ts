import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnumService, MeService } from '@arpa/services';
import { AppointmentParticipationPrediction, AppointmentStatus, MyAppointmentDto, ProjectDto } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'arpa-appointments-widget',
  templateUrl: './appointments-widget.component.html',
  styleUrls: ['./appointments-widget.component.scss'],
})
export class AppointmentsWidgetComponent {
  userAppointments$: Observable<MyAppointmentDto[]> = of([]);
  // totalRecordsCount$: Observable<number> = of(0);
  totalRecordsCountMissingPrediction$: Observable<number> = of(0);
  predictions$: Observable<SelectItem[]>;

  constructor(
    private router: Router,
    private meService: MeService,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private enumService: EnumService
  ) {
    this.predictions$ = this.enumService.getAppointmentParticipationPredictionSelectItems();
  }

  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getMyAppointments(take, skip);
    this.userAppointments$ = loadResult$.pipe(map((result) => result?.userAppointments || []));
    // this.totalRecordsCount$ = loadResult$.pipe(map((result) => result?.totalRecordsCount || 0));
    this.totalRecordsCountMissingPrediction$ = loadResult$.pipe(
      map((result) => result?.userAppointments?.filter((appointment) => !!appointment && !appointment.prediction).length ?? 0)
    );
    this.cdRef.detectChanges();
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
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
  onRowClick(event: any): void {
    this.router.navigate(['/arpa/profile/appointments']);
  }
}
