import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projectparticipations.graphql';
import { ProjectParticipationDto } from '@arpa/models';
import { first, map } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectService } from '@arpa/services';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ParticipationDialogComponent } from '../../../participation-dialog/participation-dialog.component';

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = Subscription.EMPTY;

  projectId: string;

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
      ],
    },
    {
      label: 'projects.PARTICIPATION_STATUS_RESULT',
      property: 'participationStatusResult',
      type: 'badge',
      badgeStateMap: [
        { label: 'projectParticipationStatusInternal.CANDIDATE', value: 'CANDIDATE', severity: 'info' },
        { label: 'projectParticipationStatusInternal.PENDING', value: 'PENDING', severity: 'warning' },
        { label: 'projectParticipationStatusInternal.ACCEPTANCE', value: 'ACCEPTANCE', severity: 'success' },
        { label: 'projectParticipationStatusInternal.REFUSAL', value: 'REFUSAL', severity: 'danger' },
      ],
    },
  ];

  tableData = new BehaviorSubject([]);
  totalReplies = 0;
  totalInvited = 0;
  innerStatsCount: Record<string, number> = {};
  innerStatsValues: number[] = [];
  innerStatsKeys: string[] = [];
  personId: string | undefined;
  project: any;
  participations: ProjectParticipationDto[] = [];

  constructor(
    private config: DynamicDialogConfig,
    private translate: TranslateService,
    private dialogService: DialogService,
    private projectService: ProjectService
  ) {
    this.projectId = this.config.data.project.id;
  }

  ngOnInit(): void {
    this.reloadProjectDetails();
  }

  private reloadProjectDetails(): void {
    const variables = { projectId: this.projectId };
    const query = {
      query: this.query,
      variables,
    };
    this.projectService
      .query(query)
      .pipe(map((result: any) => result.data?.projects?.items?.[0]))
      .subscribe((result: any) => {
        this.project = result;
        const participations = this.project?.projectParticipations || [];
        participations.forEach((participation: Record<string, any>) => {
          if (participation.participationStatusInner) {
            if (this.innerStatsCount[participation.participationStatusInner]) {
              this.innerStatsCount[participation.participationStatusInner] += 1;
            } else {
              this.innerStatsCount[participation.participationStatusInner] = 1;
            }
            this.totalReplies += 1;
          }
        });

        this.tableData.next(participations);
        this.totalInvited = participations.length;

        this.innerStatsValues = Object.values(this.innerStatsCount);
        this.innerStatsKeys = Object.keys(this.innerStatsCount).map((key) =>
          this.translate.instant(`projectParticipationStatusInner.${key}`)
        );
        this.ready = true;
      });
  }

  openParticipationDialog(row: any) {
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: { project: this.project, personId: row.musicianProfile.person.id },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    const closeSubscription = ref.onClose.pipe(first()).subscribe(() => {
      this.reloadProjectDetails();
    });
    this.subscriptions.add(closeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
