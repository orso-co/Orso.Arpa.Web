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
import { ProjectParticipationComponent } from '../project-participation/project-participation.component';
import { MeService } from '../../../core/services/me.service';
import { SelectValueService } from '../../../core/services/select-value.service';
import { Table } from 'primeng/table';
import { VenueService } from '../../../core/services/venue.service';
import { SectionService } from '../../../core/services/section.service';
import { ProjectParticipantsComponent } from '../project-participants/project-participants.component';
import { SelectItem } from 'primeng/api';
import { ProjectDto } from '../../../model/projectDto';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
@Unsubscribe()
export class ProjectListComponent {

  projects: Observable<ProjectDto[]>;
  state: Observable<SelectItem[]>;

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
    private sectionService: SectionService,
  ) {
    this.projects = this.route.data.pipe<ProjectDto[]>(map((data) => data.projects));
    this.state = this.selectValueService.load('Project', 'State')
      .pipe(map(() => this.selectValueService.get('Project', 'State')));
  }

  public getState(id: string) {
    return this.state.pipe<string>(map((items: SelectItem[]) => {
      const item: any = items.find((i) => i.value === id);
      return item ? item.label : '';
    }));
  }

  public openProjectDetailDialog(selection: ProjectDto | null): void {
    const ref = this.dialogService.open(EditProjectComponent, {
      data: {
        project: selection ? selection : null,
        projects: this.projects,
        venues: this.venueService.load(),
        type: this.selectValueService.load('Project', 'Type').pipe(map(() => this.selectValueService.get('Project', 'Type'))),
        genre: this.selectValueService.load('Project', 'Genre').pipe(map(() => this.selectValueService.get('Project', 'Genre'))),
        state: this.state,
      },
      header: selection ? this.translate.instant('projects.EDIT_PROJECT') : this.translate.instant('projects.NEW_PROJECT'),
      styleClass: 'form-modal',
    });
    ref.onClose
      .pipe(first())
      .subscribe((project: ProjectDto) => {
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
        musicianProfiles: this.meService.getProfileMusician<MusicianProfileDto[]>(),
        sections: this.sectionService.load(),
        id,
      },
      header: this.translate.instant('projects.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
    });

    ref.onClose
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.meService.putProjectParticipation(result.musicianId, id, result).subscribe(() => this.notificationsService.success('projects.SET_PARTICIPATION_STATUS'));
        }
      });
  }

  public openParticipationListDialog(event: MouseEvent, project: ProjectDto) {
    event.stopPropagation();
    this.dialogService.open(ProjectParticipantsComponent, {
      data: {
        project,
      },
      header: `${this.translate.instant('projects.PARTICIPANTS')}: ${project.title}`,
      styleClass: 'form-modal',
    });
  }

  public clear(ref: Table) {
    ref.clear();
  }

  private saveNewProject(project: ProjectDto): void {
    this.projectService.create(project)
      .subscribe((result) => {
        this.projects = this.projectService.load();
        this.notificationsService.success('projects.PROJECT_CREATED');
      });
  }

  private updateProject(project: ProjectDto, oldProject: ProjectDto): void {
    this.projectService.update(project)
      .subscribe(() => {
        this.projects = this.projectService.load();
        this.notificationsService.success('projects.PROJECT_UPDATED');
      });
  }
}
