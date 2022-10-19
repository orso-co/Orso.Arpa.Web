import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProjectParticipationDto } from '../../../../@arpa/models/projectParticipationDto';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projectparticipations.graphql';

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent implements AfterViewInit {

  @ViewChild('feedSource')
  private feedSource: GraphQlFeedComponent;

  participationStatusInner: Observable<ProjectParticipationDto>;
  participationStatusInternal: Observable<ProjectParticipationDto>;
  projectId: String;
  filteredDataCount: number;
  ready = false;
  query: DocumentNode = ProjectsQuery;
  columns: ColumnDefinition<any>[] = [
    { label: 'projects.PARTICIPANTS', property: 'musicianProfile.person.displayName', type: 'text' },
    { label: 'projects.INSTRUMENT', property: 'musicianProfile.instrument.name', type: 'text' },
    { label: 'projects.PARTICIPATION_STATUS_PERFORMER', property: 'participationStatusInner.selectValue.name', type: 'text', },
    { label: 'projects.PARTICIPATION_STATUS_STAFF', property: 'participationStatusInternal.selectValue.name', type: 'text', },
  ];
  tableData = new BehaviorSubject([]);
  innerStatsCount: Record<string, number> = {};
  innerStatsValues: number[] = [];
  innerStatsKeys: string[] = [];

  constructor(private cdref: ChangeDetectorRef, private config: DynamicDialogConfig) {
    this.projectId = this.config.data.project.id;
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

          this.innerStatsValues = Object.values(this.innerStatsCount);
          this.innerStatsKeys = Object.keys(this.innerStatsCount);
          this.ready = true;
          this.cdref.detectChanges();
          this.filteredDataCount = this.tableData.value.length;
        }
      },
    });
  }
}
