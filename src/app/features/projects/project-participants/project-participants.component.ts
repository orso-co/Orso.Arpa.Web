import { Component } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Observable } from 'rxjs';
import { IProjectParticipation } from '../../../models/projects';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { map } from 'rxjs/operators';

interface IParticipant {
  participant: string;
  instrument: string;
}

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent {

  participants: Observable<IParticipant[]>;

  constructor(private projectService: ProjectService, private config: DynamicDialogConfig) {
    this.participants = this.projectService.getParticipations(this.config.data.project.id).pipe(
      map((participation: IProjectParticipation[]) => participation.map((participant: IProjectParticipation) => ({
        participant: [participant.person.givenName, participant.person.surname].join(' '),
        instrument: participant.musicianProfile.instrumentName,
      } as IParticipant))),
    );
  }

  public clear(ref: Table) {
    ref.clear();
  }

}
