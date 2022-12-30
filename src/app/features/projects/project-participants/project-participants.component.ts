import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projectparticipations.graphql';
import { ProjectParticipationDto, SetProjectParticipationBodyDto } from '@arpa/models';
import { ParticipationDialogComponent } from '../../../../@arpa/components/participation-dialog';
import { filter, first } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService, ProjectService, LoggerService } from '@arpa/services';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'arpa-project-participants',
  templateUrl: './project-participants.component.html',
  styleUrls: ['./project-participants.component.scss'],
})
export class ProjectParticipantsComponent implements AfterViewInit, OnInit {
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
  personId: string | undefined;
  project: any;
  participations: ProjectParticipationDto[] = [];
  private routeEventsSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private cdref: ChangeDetectorRef,
    private config: DynamicDialogConfig,
    private translate: TranslateService,
    private dialogService: DialogService,
    private notificationsService: NotificationsService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private router: Router,

    private projectService: ProjectService) {this.projectId = this.config.data.project.id;}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.personId = params.get('personId') || undefined;
      this.feedSource?.refresh();
    });

    this.routeEventsSubscription = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.feedSource.refresh();
    });
  }
  ngAfterViewInit(): void {
    this.feedSource.values.subscribe({
      next: (result: Record<string, any>[]) => {
        if (result.length) {
          this.project = result[0] as any;
          this.tableData.next(this.project.projectParticipations);
          this.project.projectParticipations.forEach((p: Record<string, any>) => {
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
  openParticipationDialog(row: any) {
    const project = row.project;
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: { project: this.project, personId: row.musicianProfile.person.id },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe(() => {
      this.feedSource.refresh();
    });

  }
}
