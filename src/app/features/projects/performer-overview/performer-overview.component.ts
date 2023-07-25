import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DocumentNode } from 'graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectParticipationDto } from '@arpa/models';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '@arpa/services';
import { first, map } from 'rxjs/operators';
import { ParticipationDialogComponent } from '../../participation-dialog/participation-dialog.component';
import { PerformersQuery } from './performers.graphql';
import { Table } from 'primeng/table';
import { formatDate } from '@angular/common';

@Component({
  selector: 'arpa-performer-overview',
  templateUrl: './performer-overview.component.html',
  styleUrls: ['./performer-overview.component.scss'],
})
export class PerformerOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('dt') table: Table;
  private subscriptions: Subscription = Subscription.EMPTY;

  projectId: string;
  filteredDataCount: number;

  ready = false;

  query: DocumentNode = PerformersQuery;
  columns: ColumnDefinition<ProjectParticipationDto>[] = [
    { label: 'projects.PARTICIPANTS', property: 'musicianProfile.person.displayName', type: 'text' },
    { label: 'projects.INSTRUMENT', property: 'musicianProfile.instrument.name', type: 'text' },
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

  tableData = new BehaviorSubject<ProjectParticipationDto[]>([]);
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
  participations: ProjectParticipationDto[] = [];

  constructor(
    private config: DynamicDialogConfig,
    private translate: TranslateService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
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

        const participations = [...(this.project?.projectParticipations || [])];
        const projectAppointments = this.project?.projectAppointments || [];

        this.updateInnerStats(participations);

        const participationByPersonAndAppointment: { [personIdAndAppointmentId: string]: any } = {};
        const appointmentIds: string[] = [];

        projectAppointments.forEach((appointmentWrapper: Record<string, any>) => {
          const appointment = appointmentWrapper.appointment;

          const startTime = formatDate(new Date(appointment.startTime), 'dd.MM.yy HH:mm', 'en');
          this.columns = [
            ...this.columns,
            {
              label: `${startTime}`,
              property: `${appointment.id}`,
              type: 'text',
            },
          ];

          appointmentIds.push(appointment.id);
          const participation = (appointment.appointmentParticipations || [])?.[0];

          const key = `${participation?.personId}_${appointment.id}`;
          participationByPersonAndAppointment[key] = participation?.prediction || '--';
        });

        const tableData = participations.map((participation: any) => {
          // clone participation into participationClone
          const participationClone = { ...participation };
          const personId = participationClone?.musicianProfile?.person?.id;

          appointmentIds.forEach((appointmentId) => {
            participationClone[appointmentId] = {};

            const key = `${personId}_${appointmentId}`;
            const value = participationByPersonAndAppointment[key] || '--';
            participationClone[appointmentId] = value;
          });
          return participationClone;
        });

        this.tableData.next([...tableData]);
        this.totalInvited = tableData.length;

        this.ready = true;
        this.cdr.detectChanges();
      });
  }

  private updateInnerStats(participations: any[]): void {
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

    this.innerStatsValues = Object.values(this.innerStatsCount);
    this.innerStatsKeys = Object.keys(this.innerStatsCount).map((key) => this.translate.instant(`projectParticipationStatusInner.${key}`));
    this.finalResultsValues = Object.values(this.finalResultsCount);
    this.finalResultsKeys = Object.keys(this.finalResultsCount).map((key) =>
      this.translate.instant(`projectParticipationStatusInternal.${key}`)
    );
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
