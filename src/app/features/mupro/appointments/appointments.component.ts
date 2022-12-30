import {
  ProjectDto,
  AppointmentParticipationDto, AppointmentDto,
} from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { DocumentNode } from 'graphql';
import { AppointmentsQuery } from './appointments.graphql';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GraphQlFeedComponent } from 'src/@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { filter, first } from 'rxjs/operators';
import { ProjectService } from '@arpa/services';
import {
  ParticipationDialogComponent
} from '../../../../@arpa/components/participation-dialog/components/participation-dialog/participation-dialog.component';

@Component({
  selector: 'arpa-mupro-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  query: DocumentNode = AppointmentsQuery;
  columns: ColumnDefinition<AppointmentParticipationDto>[] = [
    { label: 'APPOINTMENT', property: 'name', type: 'text' },
    { label: 'PREDICTION', property: 'appointmentParticipations.prediction', type: 'text', show: true},
    { label: 'RESULT', property: 'appointmentParticipations.result', type: 'text', show: true},
    { label: 'COMMENT_BY_PERFORMER', property: 'appointmentParticipations.commentByPerformerInner', type: 'text', show: true}
  ];

  personId: string | undefined;
  appointments: AppointmentDto[] = [];
  participations: AppointmentParticipationDto[] = [];

  private routeEventsSubscription: Subscription = Subscription.EMPTY;
  private routeSubscription: Subscription = Subscription.EMPTY;
  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private translate: TranslateService,
  ) {
  }

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

  openParticipationDialog(project: ProjectDto) {
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: { project, personId: this.personId },
      header: this.translate.instant('mupro.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe(() => {
      this.feedSource.refresh();
    });
  }
}
