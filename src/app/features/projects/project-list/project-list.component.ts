import { Component, Input } from '@angular/core';
import {IProjectDto, IVenueDto} from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {Unsubscribe} from '../../../core/decorators/unsubscribe.decorator';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {DialogService} from 'primeng/dynamicdialog';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'arpa-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
@Unsubscribe()
export class ProjectListComponent {

  @Input() projects: IProjectDto[];
  @Input() venues: IVenueDto[];

  typeOptions: SelectItem[] = [];
  genreOptions: SelectItem[] = [];
  statusOptions: SelectItem[] = [];

  constructor(
    route: ActivatedRoute,
    private dialogService: DialogService,
    private translate: TranslateService,
  ) {
    route.data
      .pipe(first())
      .subscribe((data) => {
        this.projects = data.projects || [];
        this.venues = data.venues || [];
        this.genreOptions = data.genres || [];
        this.statusOptions = data.status || [];
        this.typeOptions = data.types
      });
  }

  filterActiveProjects(projects: IProjectDto[]): IProjectDto[] {
    return projects.filter((u) => !u.deleted) ?? null;
  }

  public openCreateProjectDialog(): void {
    const ref = this.dialogService.open(EditProjectComponent, {
      data: {
        project: null,
        venues: this.venues,
        typeOptions: this.typeOptions,
        genreOptions: this.genreOptions,
        parentProjectOptions: this.projects,
        statusOptions: this.statusOptions
      },
      header: this.translate.instant('projects.NEW_PROJECT'),
    });
    ref.onClose
      .pipe(first())
      .subscribe((project: IProjectDto) => {
        if (project) {
          this.projects = [...this.projects, project];
        }
      });
  }

  public openEditProjectDialog(project: IProjectDto): void {
    this.dialogService.open(EditProjectComponent, {
      data: {
        project: project,
        venues: this.venues,
        typeOptions: this.typeOptions,
        genreOptions: this.genreOptions,
        parentProjectOptions: this.projects,
        statusOptions: this.statusOptions
      },
      header: this.translate.instant('projects.EDIT_PROJECT'),
    });
  }
}
