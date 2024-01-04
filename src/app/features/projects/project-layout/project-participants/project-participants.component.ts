import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ColumnDefinition } from '../../../../../@arpa/components/table/table.component';
import { DocumentNode } from 'graphql';
import { ProjectParticipationsQuery, ProjectParticipationsQueryResponse } from './projectparticipations.graphql';
import { first, map } from 'rxjs/operators';
import { ProjectService } from '@arpa/services';
import { ParticipationDialogComponent } from '../../../participation-dialog/participation-dialog.component';

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = Subscription.EMPTY;

  projectId: string;
  filteredDataCount: number;

  ready = false;

  query: DocumentNode = ProjectParticipationsQuery;
  columns: ColumnDefinition<ProjectParticipationsQueryResponse>[] = [
    { label: 'projects.PARTICIPANTS', property: 'musicianProfile.person.displayName', type: 'text' },
    { label: 'projects.INSTRUMENT', property: 'musicianProfile.instrument.name', type: 'text' },
    { label: 'projects.EMAIL', property: 'musicianProfile.person.user.normalizedEmail', type: 'text' },
    {
      label: 'projects.PARTICIPATION_STATUS_INVITATION',
      property: 'invitationStatus',
      type: 'badge',
      badgeStateMap: [
        { label: 'projectInvitationStatus.PENDING', value: 'PENDING', severity: 'warning' },
        { label: 'projectInvitationStatus.SENT', value: 'SENT', severity: 'info' },
        { label: 'projectInvitationStatus.ACCEPTED', value: 'ACCEPTED', severity: 'success' },
        { label: 'projectInvitationStatus.DECLINED', value: 'DECLINED', severity: 'danger' },
      ],
    },
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
    { label: 'MODIFIED_AT', property: 'modifiedAt', type: 'date' },
    { label: 'MODIFIED_BY', property: 'modifiedBy', type: 'text' },
  ];

  tableData = new BehaviorSubject<ProjectParticipationsQueryResponse[]>([]);
  totalReplies = 0;
  totalInvited = 0;
  innerStatsCount: Record<string, number> = {};
  innerStatsValues: number[] = [];
  innerStatsKeys: string[] = [];
  finalResultsCount: Record<string, number> = {};
  finalResultsValues: number[] = [];
  finalResultsKeys: string[] = [];
  personId: string | undefined;
  project: any;
  participations: ProjectParticipationsQueryResponse[] = [];

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
          this.finalResultsCount[participation.participationStatusResult] =
            (this.finalResultsCount[participation.participationStatusResult] || 0) + 1;
        });

        this.tableData.next([...participations]);
        this.totalInvited = participations.length;

        this.innerStatsValues = Object.values(this.innerStatsCount);
        this.innerStatsKeys = Object.keys(this.innerStatsCount).map((key) =>
          this.translate.instant(`projectParticipationStatusInner.${key}`)
        );
        this.finalResultsValues = Object.values(this.finalResultsCount);
        this.finalResultsKeys = Object.keys(this.finalResultsCount).map((key) =>
          this.translate.instant(`projectParticipationStatusInternal.${key}`)
        );
        this.ready = true;
      });
  }
  onTableFiltered(event: any): void {
    this.filteredDataCount = event.filteredValue.length;
  }

  openParticipationDialog(row: any) {
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: { projectParticipation: { ...row, project: this.project } },
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
