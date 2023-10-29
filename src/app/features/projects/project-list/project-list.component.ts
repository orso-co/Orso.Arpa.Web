import { ProjectLayoutComponent } from '../project-layout/project-layout.component';
import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService, NotificationsService, SelectValueService, VenueService } from '@arpa/services';
import { Table } from 'primeng/table';
import { ProjectParticipantsComponent } from '../project-layout/project-participants/project-participants.component';
import { ProjectDto } from '@arpa/models';
import { Unsubscribe } from '../../../../@arpa/decorators/unsubscribe.decorator';
import { DocumentNode } from 'graphql';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ProjectsQuery } from './projects.graphql';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
@Unsubscribe()
export class ProjectListComponent {
  query: DocumentNode = ProjectsQuery;

  columns: ColumnDefinition<ProjectDto>[] = [
    { label: 'TITLE', property: 'title', type: 'text' },
    { label: 'TYPE', property: 'typeId', type: 'state', stateTable: 'Project', stateProperty: 'Type', show: true },
    { label: 'GENRE', property: 'genreId', type: 'state', stateTable: 'Project', stateProperty: 'Genre', show: true },
    {
      label: 'STATE',
      property: 'status',
      type: 'badge',
      badgeStateMap: [
        { label: 'projectStatus.PENDING', value: 'PENDING', severity: 'info' },
        { label: 'projectStatus.CONFIRMED', value: 'CONFIRMED', severity: 'success' },
        { label: 'projectStatus.CANCELLED', value: 'CANCELLED', severity: 'warning' },
        { label: 'projectStatus.POSTPONED', value: 'POSTPONED', severity: 'info' },
        { label: 'projectStatus.ARCHIVED', value: 'ARCHIVED', severity: 'danger' },
      ],
      show: true,
    },
    { label: 'START', property: 'startDate', type: 'date' },
    { label: 'END', property: 'endDate', type: 'date' },
    { label: '#', property: 'isCompleted', type: 'template', template: 'completed', cssClasses: ['start'] },
  ];

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private dialogService: DialogService,
    public translate: TranslateService,
    private projectService: ProjectService,
    private notificationsService: NotificationsService,
    private selectValueService: SelectValueService,
    private venueService: VenueService
  ) {}

  public openProjectDetailDialog(selection: ProjectDto | null): void {
    const ref = this.dialogService.open(ProjectLayoutComponent, {
      data: {
        project: selection ? selection : null,
        venues: this.venueService.load(),
        type: this.selectValueService.getProjectTypes(),
        genre: this.selectValueService.getProjectGenres(),
      },
      header: selection ? this.translate.instant('projects.EDIT_PROJECT') : this.translate.instant('projects.NEW_PROJECT'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });
    ref.onClose.pipe(first()).subscribe((project: ProjectDto) => {
      if (!selection && project) {
        this.saveNewProject(project);
      } else if (selection && project) {
        this.updateProject(project, selection);
      } else {
        this.feedSource.isLoading.emit(false);
      }
    });
  }

  // public openParticipationDialog(event: Event, id: string) {
  //   event.stopPropagation();
  //   const ref = this.dialogService.open(ProjectParticipationComponent, {
  //     data: {
  //       projectParticipation: this.selectValueService.load('ProjectParticipation', 'ParticipationStatusInner'),
  //       musicianProfiles: this.meService.getProfilesMusician<MusicianProfileDto[]>(),
  //       sections: this.sectionService.load(),
  //       id,
  //       participationPerformer: this.projectService.getParticipations,
  //       participationStaff: this.projectService.getParticipations,
  //       statusOptionsPerformer$: this.projectService.getParticipations,
  //       statusOptionsStaff$: this.projectService.getParticipations,
  //     },
  //     header: this.translate.instant('projects.EDIT_PARTICIPATION'),
  //     styleClass: 'form-modal',
  //     dismissableMask: true,
  //   });
  //
  //   ref.onClose.pipe(first()).subscribe((result) => {
  //     if (result) {
  //       this.meService
  //         .putProjectParticipation(result.musicianId, id, result)
  //         .subscribe(() => this.notificationsService.success('projects.SET_PARTICIPATION_STATUS'));
  //     }
  //   });
  // }

  public openParticipationListDialog(event: Event, project: ProjectDto) {
    event.stopPropagation();
    this.dialogService.open(ProjectParticipantsComponent, {
      data: {
        project,
      },
      header: `${this.translate.instant('projects.PARTICIPANTS')}: ${project.title}`,
      styleClass: 'form-modal',
      dismissableMask: true,
    });
  }

  public clear(ref: Table) {
    ref.clear();
  }

  onRowClick(event: ProjectDto) {
    this.openProjectDetailDialog(event);
  }

  private saveNewProject(project: ProjectDto): void {
    this.projectService.create(project).subscribe((result) => {
      this.feedSource.refresh();
      this.notificationsService.success('projects.PROJECT_CREATED');
    });
  }

  private updateProject(project: ProjectDto, oldProject: ProjectDto): void {
    this.projectService.update(project).subscribe(() => {
      this.feedSource.refresh();
      this.notificationsService.success('projects.PROJECT_UPDATED');
    });
  }
}
