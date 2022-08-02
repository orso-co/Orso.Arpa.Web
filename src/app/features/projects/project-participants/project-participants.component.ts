import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProjectParticipationDto } from '../../../../@arpa/models/projectParticipationDto';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projectparticipations.graphql';

// interface Participant {
//   participant: string;
//   instrument: string;
//   state: string;
//   participationStatusInner: string;
//   participationStatusInternal: string;
// }

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent implements AfterViewInit {
  // participants: Observable<Participant[]>;
  participationStatusInner: Observable<ProjectParticipationDto>;
  participationStatusInternal: Observable<ProjectParticipationDto>;
  projectId: String;

  constructor(private cdref: ChangeDetectorRef, private config: DynamicDialogConfig) {
    this.projectId = this.config.data.project.id;
  }

  query: DocumentNode = ProjectsQuery;

  columns: ColumnDefinition<any>[] = [
    { label: 'projects.PARTICIPANTS', property: 'musicianProfile.person.displayName', type: 'text' },
    { label: 'projects.INSTRUMENT', property: 'musicianProfile.instrument.name', type: 'text' },
    {
      label: 'projects.PARTICIPATION_STATUS_PERFORMER',
      property: 'participationStatusInner.selectValue.name',
      type: 'text',
    },
    {
      label: 'projects.PARTICIPATION_STATUS_STAFF',
      property: 'participationStatusInternal.selectValue.name',
      type: 'text',
    },
  ];

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  public tableData = new BehaviorSubject([]);
  private innerStatsCount: Record<string, number> = {};

  get innerStatsValues() {
    return Object.values(this.innerStatsCount);
  }

  get innerStatsKeys() {
    return Object.keys(this.innerStatsCount);
  }

  ngAfterViewInit(): void {
    this.feedSource.values.subscribe({
      next: (result: Record<string, any>[]) => {
        if (result.length) {
          this.tableData.next(result[0].projectParticipations);
          result[0].projectParticipations.forEach((p: Record<string, any>) => {
            if (p.participationStatusInner) {
              if (this.innerStatsCount[p.participationStatusInner.selectValue.name]) {
                this.innerStatsCount[p.participationStatusInner.selectValue.name]++;
              } else {
                this.innerStatsCount[p.participationStatusInner.selectValue.name] = 1;
              }
            }
          });
          this.cdref.detectChanges();
        }
      },
    });
  }
}
