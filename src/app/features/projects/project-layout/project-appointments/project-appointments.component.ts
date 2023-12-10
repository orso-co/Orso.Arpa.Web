import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { AppointmentDto, AppointmentListDto } from '@arpa/models';
import { NotificationsService, ProjectService } from '@arpa/services';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { EditAppointmentComponent } from '../../../appointments/edit-appointment/edit-appointment.component';
import { AppointmentService } from '../../../appointments/services/appointment.service';

@Component({
  selector: 'arpa-project-my-appointments',
  templateUrl: './project-appointments.component.html',
  styleUrls: ['./project-appointments.component.scss'],
})
export class ProjectAppointmentsComponent implements OnInit {
  @Input() projectId: string;
  filteredAppointmentsCount: number;

  columns: ColumnDefinition<AppointmentDto>[] = [
    { label: 'APPOINTMENT', property: 'appointment.name', type: 'text' },
    { label: 'START', property: 'appointment.startTime', type: 'date', show: true },
    { label: 'END', property: 'appointment.endTime', type: 'date', show: true },
    { label: 'SECTION', property: 'appointment.sections.name', type: 'badge', show: true },
    { label: 'VENUE', property: 'appointment.venue.name', type: 'text', show: true },
    { label: 'STATUS', property: 'appointment.status', type: 'badge', show: true },
    { label: 'CREATED_BY', property: 'appointment.createdBy', type: 'text', show: false },
    { label: 'CREATED_AT', property: 'appointment.createdAt', type: 'date', show: false },
  ];
  appointments = new BehaviorSubject([]);

  constructor(
    private projectService: ProjectService,
    private appointmentService: AppointmentService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    public translate: TranslateService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    if (this.projectId) {
      this.projectService.getAppointmentsForProject(this.projectId).subscribe((appointments) => {
        this.appointments.next(appointments || []);
      });
    }
  }

  openEditAppointment(row: any) {
    const appointment = row.appointment;
    const ref = this.dialogService.open(EditAppointmentComponent, {
      data: { appointment, isAllDayEvent: this.isAllDayEvent(appointment) },
      header: this.translate.instant('my-appointments.EDIT_APPOINTMENT'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe(() => {
      this.reloadData();
    });
  }

  private isAllDayEvent(appointment: AppointmentListDto | undefined): boolean {
    if (appointment === undefined) {
      return false;
    }

    let isAllDay = false;
    const startT = new Date(appointment.startTime);
    const endT = new Date(appointment.endTime);

    if (endT.getHours() === 23 && endT.getMinutes() === 59 && startT.getHours() === 0) {
      isAllDay = true;
    }
    return isAllDay;
  }
}
