import { Component } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';
import { Observable } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { map } from 'rxjs/operators';
import { ProjectParticipationDto } from '../../../../@arpa/models/projectParticipationDto';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';

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
  participationStatusInner: Observable<ProjectParticipationDto>

  columns: ColumnDefinition<any>[] = [
    { label: 'projects.PARTICIPANTS', property: 'participant', type: 'text' },
    { label: 'projects.PARTICIPATIONSTATUS_INNER', property: 'participationStatusInner', type: 'text'},
    { label: 'projects.INSTRUMENT', property: 'instrument', type: 'text' },
    {
      label: 'projects.INSTRUMENT_STATE',
      property: 'state',
      type: 'badge',
      badgeStateMap: [
        {
          label: 'DEACTIVATED',
          value: 'deactivated',
          severity: '',
        },
        {
          label: 'ACTIVE',
          value: 'active',
          severity: 'success',

        },
      ],
    },
  ];

  constructor(private projectService: ProjectService, private config: DynamicDialogConfig) {
    this.participants = this.projectService.getParticipations(this.config.data.project.id).pipe(
      map((participation: ProjectParticipationDto[]) => participation.map((participant: ProjectParticipationDto) => ({
        participant: [participant.person?.givenName, participant.person?.surname, participant.participationStatusInner].join(' '),
        instrument: participant.musicianProfile?.instrumentName,
        state: this.isDeactivated(participant),
      } as Participant))),
    );
  }

  public clear(ref: Table) {
    ref.clear();
  }

  private isDeactivated(participant: ProjectParticipationDto): string {
    let state = 'active';
    if (participant.musicianProfile?.deactivation) {
      const { deactivationStart } = participant.musicianProfile.deactivation;
      const start = new Date(deactivationStart as unknown as string || '');
      const projectDate = new Date(this.config.data.project.startDate);
      if (start.getTime() < projectDate.getTime()) {
        state = 'deactivated';
      }
    }
    return state;
  }

}
