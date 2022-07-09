import { ProjectLayoutComponent } from '../project-layout/project-layout.component';
import { Component, ViewChild } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../../shared/services/project.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { ProjectParticipationComponent } from '../project-participation/project-participation.component';
import { MeService } from '../../../shared/services/me.service';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { Table } from 'primeng/table';
import { VenueService } from '../../../shared/services/venue.service';
import { SectionService } from '../../../shared/services/section.service';
import { ProjectParticipantsComponent } from '../project-participants/project-participants.component';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
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
    { label: '#', property: 'isCompleted', type: 'template', template: 'completed', cssClasses: ['start'] },
    { label: 'TITLE', property: 'title', type: 'text' },
    { label: 'GENRE', property: 'genreId', type: 'state', stateTable: 'Project', stateProperty: 'Genre', show: true },
    { label: 'START', property: 'startDate', type: 'date' },
    { label: 'END', property: 'endDate', type: 'date' },
    { label: 'STATE', property: 'stateId', type: 'state', stateTable: 'Project', stateProperty: 'State', show: true },
  ];

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private dialogService: DialogService,
    public translate: TranslateService,
    private projectService: ProjectService,
    private notificationsService: NotificationsService,
    private meService: MeService,
    private selectValueService: SelectValueService,
    private venueService: VenueService,
    private sectionService: SectionService
  ) {}

  public openProjectDetailDialog(selection: ProjectDto | null): void {
    const ref = this.dialogService.open(ProjectLayoutComponent, {
      data: {
        project: selection ? selection : null,
        venues: this.venueService.load(),
        type: this.selectValueService.load('Project', 'Type').pipe(map(() => this.selectValueService.get('Project', 'Type'))),
        genre: this.selectValueService.load('Project', 'Genre').pipe(map(() => this.selectValueService.get('Project', 'Genre'))),
        state: this.selectValueService.load('Project', 'State').pipe(map(() => this.selectValueService.get('Project', 'State'))),
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
      }
    });
  }

  public openParticipationDialog(event: Event, id: string) {
    event.stopPropagation();
    const ref = this.dialogService.open(ProjectParticipationComponent, {
      data: {
        projectParticipation: this.selectValueService.load('ProjectParticipation', 'ParticipationStatusInner'),
        musicianProfiles: this.meService.getProfilesMusician<MusicianProfileDto[]>(),
        sections: this.sectionService.load(),
        id,
        participationPerformer: this.projectService.getParticipations,
        participationStaff: this.projectService.getParticipations,
        statusOptionsPerformer$: this.projectService.getParticipations,
        statusOptionsStaff$: this.projectService.getParticipations,
      },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });

    ref.onClose.pipe(first()).subscribe((result) => {
      if (result) {
        this.meService
          .putProjectParticipation(result.musicianId, id, result)
          .subscribe(() => this.notificationsService.success('projects.SET_PARTICIPATION_STATUS'));
      }
    });
  }

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
