import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentParticipationsService } from './appointmentparticipations.service';
import { AppointmentDto, ProjectParticipationDto } from '@arpa/models';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';

@Component({
  selector: 'arpa-appointment-participations',
  templateUrl: './appointment-participations.component.html',
  styleUrls: ['./appointment-participations.component.scss']
})
export class AppointmentParticipationsComponent implements OnChanges {
  @Input() participation: ProjectParticipationDto;
  @Input() projectId: string;
  @Input() musicianId: string;
  appointmentParticipations$: Observable<any>;
  columns: ColumnDefinition<AppointmentDto>[] = [
    { label: 'APPOINTMENT', property: 'appointment.name', type: 'text' },
    { label: 'BEGIN', property: 'appointment.startTime', type: 'date' },
    { label: 'PREDICTION', property: 'appointmentParticipation.prediction', type: 'text' },
    { label: 'RESULT', property: 'appointmentParticipation.result', type: 'text' },


  ];
  constructor(
    private appointmentParticipationsService: AppointmentParticipationsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.projectId || changes.musicianId) {
      this.appointmentParticipations$ = this.appointmentParticipationsService.getByProjectId(this.projectId, this.musicianId);
    }
  }


}
