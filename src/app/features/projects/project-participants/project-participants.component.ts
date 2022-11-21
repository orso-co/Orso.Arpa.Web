import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
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

  projectId: string;
  filteredDataCount: number;
  ready = false;
  query: DocumentNode = ProjectsQuery;
  columns: ColumnDefinition<any>[] = [
    { label: 'projects.PARTICIPANTS', property: 'musicianProfile.person.displayName', type: 'text' },
    { label: 'projects.INSTRUMENT', property: 'musicianProfile.instrument.name', type: 'text' },
    {
      label: 'projects.PARTICIPATION_STATUS_PERFORMER',
      property: 'participationStatusInner',
      type: 'badge',
      badgeStateMap: [
        { label: 'projectParticipationStatusInner.INTERESTED', value: 'INTERESTED', severity: 'info' },
        { label: 'projectParticipationStatusInner.PENDING', value: 'PENDING', severity: 'warning' },
        { label: 'projectParticipationStatusInner.ACCEPTANCE', value: 'ACCEPTANCE', severity: 'success' },
        { label: 'projectParticipationStatusInner.REFUSAL', value: 'REFUSAL', severity: 'danger' },
      ],
    },
    {
      label: 'projects.PARTICIPATION_STATUS_STAFF',
      property: 'participationStatusInternal',
      type: 'badge',
      badgeStateMap: [
        { label: 'projectParticipationStatusInternal.CANDIDATE', value: 'CANDIDATE', severity: 'info' },
        { label: 'projectParticipationStatusInternal.PENDING', value: 'PENDING', severity: 'warning' },
        { label: 'projectParticipationStatusInternal.ACCEPTANCE', value: 'ACCEPTANCE', severity: 'success' },
        { label: 'projectParticipationStatusInternal.REFUSAL', value: 'REFUSAL', severity: 'danger' },
      ]
    },
  ];
  tableData = new BehaviorSubject([]);
  innerStatsCount: Record<string, number> = {};
  innerStatsValues: number[] = [];
  innerStatsKeys: string[] = [];

  constructor(private cdref: ChangeDetectorRef, private config: DynamicDialogConfig, private translate: TranslateService) {
    this.projectId = this.config.data.project.id;
  }

  ngAfterViewInit(): void {
    this.feedSource.values.subscribe({
      next: (result: Record<string, any>[]) => {
        if (result.length) {
          this.tableData.next(result[0].projectParticipations);
          result[0].projectParticipations.forEach((p: Record<string, any>) => {
            if (p.participationStatusInner) {
              if (this.innerStatsCount[p.participationStatusInner]) {
                this.innerStatsCount[p.participationStatusInner]++;
              } else {
                this.innerStatsCount[p.participationStatusInner] = 1;
              }
            }
          });

          this.innerStatsValues = Object.values(this.innerStatsCount);
          this.innerStatsKeys = Object.keys(this.innerStatsCount).map((key) =>
            this.translate.instant(`projectParticipationStatusInner.${key}`)
          );
          this.ready = true;
          this.cdref.detectChanges();
          this.filteredDataCount = this.tableData.value.length;
        }
      },
    });
  }
}
