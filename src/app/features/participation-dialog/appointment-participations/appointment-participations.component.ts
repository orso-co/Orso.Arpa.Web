import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentParticipationsService } from './appointmentparticipations.service';
import { ProjectParticipationDto } from '@arpa/models';

@Component({
  selector: 'arpa-appointment-participations',
  templateUrl: './appointment-participations.component.html',
  styleUrls: ['./appointment-participations.component.scss']
})
export class AppointmentParticipationsComponent {
  @Input() participation: ProjectParticipationDto;
  @Input() projectId: string;
  @Input() musicianId: string;
  appointmentParticipations$: Observable<any>;

  constructor(
    private appointmentParticipationsService: AppointmentParticipationsService
  ) {
      this.appointmentParticipations$ = this.appointmentParticipationsService.getByProjectId(this.projectId, this.musicianId);
    }

}
