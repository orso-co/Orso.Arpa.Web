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
      .subscribe((newProject: IProjectDto) => {
        if (!oldProject && newProject) {
          this.projects = [...this.projects, newProject];
        } else if (oldProject && newProject) {
          const index = this.projects.findIndex((project) => oldProject.id === newProject.id);
          this.projects[index] = newProject;
          this.projects = [...this.projects];
        }
      });
  }
}
