import { Component, Input } from '@angular/core';
import {IProjectDto, IVenueDto} from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {Unsubscribe} from '../../../core/decorators/unsubscribe.decorator';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {DialogService} from 'primeng/dynamicdialog';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { NotificationsService } from '../../../core/services/notifications.service';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
@Unsubscribe()
export class ProjectListComponent {

  projects: IProjectDto[];
  venues: IVenueDto[];
  typeOptions: SelectItem[] = [];
  genreOptions: SelectItem[] = [];
  stateOptions: SelectItem[] = [];

  cols: any[];
  langChangeListener: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    public translate: TranslateService,
    private projectService: ProjectService,
    private notificationsService: NotificationsService
  ) {
    this.getRouteData();
    this.initializeColumns();
    this.langChangeListener = this.translate.onLangChange.subscribe(() => this.initializeColumns());
  }

  private getRouteData(): void {
    this.route.data
      .pipe(first())
      .subscribe((data) => {
        this.projects = data.projects || [];
        this.venues = data.venues || [];
        this.genreOptions = data.genres || [];
        this.stateOptions = data.state || [];
        this.typeOptions = data.types || [];
      });
  }

  private initializeColumns(): void {
    this.cols = [
      { field: 'title', header: this.translate.instant('projects.TITLE') },
      { field: 'shortTitle', header: this.translate.instant('projects.ABBREVIATION') },
      { field: 'venue', header: this.translate.instant('projects.VENUE') },
      { field: 'startDate', header: this.translate.instant('projects.START'), type: 'date' },
      { field: 'endDate', header: this.translate.instant('projects.END'), type: 'date' },
      { field: 'stateId', header: this.translate.instant('projects.STATE') },
      { field: 'isCompleted', header: this.translate.instant('projects.COMPLETED'), type: 'boolean' },
    ];
  }

  public openProjectDetailDialog(oldProject: IProjectDto | null): void {
    const ref = this.dialogService.open(EditProjectComponent, {
      data: {
        project: oldProject ? oldProject : null,
        venues: this.venues,
        typeOptions: this.typeOptions,
        genreOptions: this.genreOptions,
        projects: this.projects,
        stateOptions: this.stateOptions,
        completedOptions: [
          {label: this.translate.instant('YES'), value: true},
          {label: this.translate.instant('NO'), value: false}
        ]
      },
      header: oldProject ? this.translate.instant('projects.EDIT_PROJECT') : this.translate.instant('projects.NEW_PROJECT')
    });
    ref.onClose
      .pipe(first())
      .subscribe((project: IProjectDto) => {
        if (!oldProject && project) {
          this.saveNewProject(project);
        } else if (oldProject && project) {
          this.updateProject(project, oldProject);
        }
      });
  }


  private saveNewProject(project: IProjectDto): void {
    this.projectService.create(project)
      .pipe(first())
      .subscribe((result) => {
        this.projects = [...this.projects, project];
        this.notificationsService.success('projects.PROJECT_CREATED');
      });
  }

  private updateProject(project: IProjectDto, oldProject: IProjectDto): void {
    this.projectService.update(project)
      .pipe(first())
      .subscribe(() => {
        const index = this.projects.findIndex((p) => oldProject.id === p.id);
        this.projects[index] = project;
        this.projects = [...this.projects];
        this.notificationsService.success('projects.PROJECT_UPDATED');
      });
  }
}
