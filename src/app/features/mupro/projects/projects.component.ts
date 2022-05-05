import { ProjectParticipationDto } from './../../../../@arpa/models/projectParticipationDto';
import { NotificationsService } from 'src/@arpa/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { DocumentNode } from 'graphql';
import { ProjectsQuery } from './projects.graphql';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GraphQlFeedComponent } from 'src/@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { filter, first } from 'rxjs/operators';
import { ParticipationDialogComponent } from '../participation-dialog/participation-dialog.component';
import { ProjectService } from './../../../shared/services/project.service';
import { LoggerService } from '../../../../@arpa/services/logger.service';

@Component({
  selector: 'arpa-mupro-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  query: DocumentNode = ProjectsQuery;
  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'PROJECT', property: 'title', type: 'text' },
    { label: 'PARTICIPATIONSTATUS_PERFORMER', property: 'projectParticipations.participationStatusInner.selectValue.name', type: 'text', show: true },
    { label: 'PARTICIPATIONSTATUS_STAFF', property: 'projectParticipations.participationStatusInternal.selectValue.name', type: 'text', show: true },
    { label: 'COMMENT_PERFORMER', property: 'projectParticipations.commentByPerformerInner', type:'text', show: true},
  ];

  personId: string | undefined;
  private routeEventsSubscription: Subscription = Subscription.EMPTY;
  private routeSubscription: Subscription = Subscription.EMPTY;

  projects: ProjectDto[] = [];
  participations: ProjectParticipationDto[] = [];

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private translate: TranslateService,
    private notificationsService: NotificationsService,
    private logger: LoggerService
    ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.personId = params.get('personId') || undefined;
      this.feedSource?.refresh();
    });

    this.routeEventsSubscription = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.feedSource.refresh();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.routeEventsSubscription.unsubscribe();
  }

  openParticipationDialog(project: string) {
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: project,
      header: this.translate.instant('mupro.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe((project) => {
      if(project) {
        this.logger.info('updated:', project);
        this.notificationsService.success('UPDATED_PROJECT_PARTICIPATION');
      }
    })
  }
}
