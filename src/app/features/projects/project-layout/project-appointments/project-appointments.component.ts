import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { AppointmentDto } from '@arpa/models';
import { NotificationsService, ProjectService } from '@arpa/services';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { EditAppointmentComponent } from '../../../appointments/edit-appointment/edit-appointment.component';
import { AppointmentService } from '../../../appointments/services/appointment.service';
import { GraphQlFeedComponent } from '../../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';


@Component({
  selector: 'arpa-project-appointments',
  templateUrl: './project-appointments.component.html',
  styleUrls: ['./project-appointments.component.scss']
})
export class ProjectAppointmentsComponent implements OnInit {
  @ViewChild('feedSource')
  private feedSource: GraphQlFeedComponent;
  @Input() projectId: string;


  columns: ColumnDefinition<AppointmentDto>[] = [
    { label: 'APPOINTMENT', property: 'appointment.name', type: 'text' },
    { label: 'SECTION', property: 'appointment.sections.name', type: 'badge', show: true },
    { label: 'START', property: 'appointment.startTime', type: 'date', show: true },
    { label: 'END', property: 'appointment.endTime', type: 'date', show: true },
    { label: 'STATUS', property: 'appointment.status', type: 'badge', show: true},
    { label: 'VENUE', property: 'appointment.venue.name', type: 'text', show: true},

    // { label: 'CREATED_BY', property: 'appointment.createdBy', type: 'text', show: true},
    // { label: 'CREATED_AT', property: 'appointment.createdAt', type: 'date', show: true}


  ];
  appointments = new BehaviorSubject([]);

  constructor(
    private projectService: ProjectService,
    private appointmentService: AppointmentService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    public translate: TranslateService,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.projectId) {
      this.projectService.getAppointmentsForProject(this.projectId).subscribe(appointments => {
        this.appointments.next(appointments || []);
      });
    }
  }


  openEditAppointment(row: any) {
    const appointment = row.appointment;
    const ref = this.dialogService.open(EditAppointmentComponent, {
      data: { appointment: this.appointments, appointmentId: row.project?.appointmentId },
      header: this.translate.instant('appointments.EDIT_APPOINTMENT'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe(() => {
      this.feedSource.refresh();
    });

  }
}

