import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Unsubscribe } from '../../../core/decorators/unsubscribe.decorator';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { IProjectDto } from '../../../models/IProjectDto';
import { IMusicianProfileDto } from '../../../models/appointment';
import { ProjectParticipationComponent } from '../project-participation/project-participation.component';
import { MeService } from '../../../core/services/me.service';
import { SelectValueService } from '../../../core/services/select-value.service';
import { Table } from 'primeng/table';
import { VenueService } from '../../../core/services/venue.service';
import { SectionService } from '../../../core/services/section.service';
import { ProjectParticipantsComponent } from '../project-participants/project-participants.component';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
@Unsubscribe()
export class ProjectListComponent {

  projects: Observable<IProjectDto[]>;

  cols: any[];
  langChangeListener: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    public translate: TranslateService,
    private projectService: ProjectService,
    private notificationsService: NotificationsService,
    private meService: MeService,
    private selectValueService: SelectValueService,
    private venueService: VenueService,
    private sectionService: SectionService
  ) {
    this.projects = this.route.data.pipe<IProjectDto[]>(map((data) => data.projects));
  }

  public openProjectDetailDialog(selection: IProjectDto | null): void {
    const ref = this.dialogService.open(EditProjectComponent, {
      data: {
        project: selection ? selection : null,
        projects: this.projects,
        venues: this.venueService.load(),
        type: this.selectValueService.load('Project', 'Type').pipe(map(() => this.selectValueService.get('Project', 'Type'))),
        genre: this.selectValueService.load('Project', 'Genre').pipe(map(() => this.selectValueService.get('Project', 'Genre'))),
        state: this.selectValueService.load('Project', 'State').pipe(map(() => this.selectValueService.get('Project', 'State'))),
      },
      header: selection ? this.translate.instant('projects.EDIT_PROJECT') : this.translate.instant('projects.NEW_PROJECT')
    });
    ref.onClose
      .pipe(first())
      .subscribe((project: IProjectDto) => {
        if (!selection && project) {
          this.saveNewProject(project);
        } else if (selection && project) {
          this.updateProject(project, selection);
        }
      });
  }

  public openParticipationDialog(event: MouseEvent, id: string) {
    event.stopPropagation();
    const ref = this.dialogService.open(ProjectParticipationComponent, {
      data: {
        projectParticipation: this.selectValueService.load('ProjectParticipation', 'ParticipationStatusInner'),
        musicianProfiles: this.meService.getProfileMusician<IMusicianProfileDto[]>(),
        sections: this.sectionService.load(),
        id,
      },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
    });

    ref.onClose
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.meService.putProjectParticipation(result.musicianId, id, {
            statusId: result.statusId,
            comment: result.comment,
          }).subscribe(() => this.notificationsService.success('projects.SET_PARTICIPATION_STATUS'));
        }
      });
  }

  public openParticipationListDialog(event: MouseEvent, project: IProjectDto) {
    event.stopPropagation();
    this.dialogService.open(ProjectParticipantsComponent, {
      data: {
        project,
      },
      header: `${this.translate.instant('projects.PARTICIPANTS')}: ${project.title}` ,
    });
  }

  public clear(ref: Table) {
    ref.clear();
  }

  private saveNewProject(project: IProjectDto): void {
    this.projectService.create(project)
      .subscribe((result) => {
        this.projects = this.projectService.load();
        this.notificationsService.success('projects.PROJECT_CREATED');
      });
  }

  private updateProject(project: IProjectDto, oldProject: IProjectDto): void {
    this.projectService.update(project)
      .subscribe(() => {
        this.projects = this.projectService.load();
        this.notificationsService.success('projects.PROJECT_UPDATED');
      });
  }
}
