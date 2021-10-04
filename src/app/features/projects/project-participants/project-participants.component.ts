import { Component } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';
import { Observable } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { map } from 'rxjs/operators';
import { ProjectParticipationDto } from '../../../../@arpa/models/projectParticipationDto';

interface Participant {
  participant: string;
  instrument: string;
}

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent {

  participants: Observable<Participant[]>;

  constructor(private projectService: ProjectService, private config: DynamicDialogConfig) {
    this.participants = this.projectService.getParticipations(this.config.data.project.id).pipe(
      map((participation: ProjectParticipationDto[]) => participation.map((participant: ProjectParticipationDto) => ({
        participant: [participant.person.givenName, participant.person.surname].join(' '),
        instrument: participant.musicianProfile.instrumentName,
      } as Participant))),
    );
  }

  public clear(ref: Table) {
    ref.clear();
  }

}
