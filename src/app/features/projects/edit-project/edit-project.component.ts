import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IVenueDto } from '../../../models/appointment';
import { IProjectDto } from '../../../models/IProjectDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ProjectService } from '../../../core/services/project.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'arpa-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  project: IProjectDto = this.config.data.project;
  venues: IVenueDto[] = this.config.data.venues;
  venueOptions: SelectItem[] = [];
  projects: IProjectDto[] = this.config.data.projects;
  parentProjectOptions: SelectItem[] = [];
  typeOptions: SelectItem[] = this.config.data.typeOptions;
  genreOptions: SelectItem[] = this.config.data.genreOptions;
  stateOptions: SelectItem[] = this.config.data.stateOptions;
  completedOptions: SelectItem[] = this.config.data.completedOptions;

  formGroup: FormGroup;

  get isNew(): boolean {
    return !this.project;
  }

  constructor(
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public ref: DynamicDialogRef,
    private projectService: ProjectService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (!this.isNew) {
      this.fillForm();
    }
    this.venueOptions = this.venues ? this.venues.map((v) => this.mapVenueToSelectItem(v)) : [];
    this.parentProjectOptions = this.projects
      ? this.projects.filter((project) => project !== this.project).map((p) => this.mapParentProjectToSelectItem(p))
      : [];
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      shortTitle: [null, [Validators.required]],
      startDate: [null],
      endDate: [null],
      description: [null],
      typeId: [null],
      stateId: [null],
      genreId: [null],
      parentId: [null],
      // eslint-disable-next-line id-blacklist
      code: [null, [Validators.required]],
      isCompleted: [null, [Validators.required]],
    });
  }

  private fillForm(): void {
    this.formGroup.reset({
      ...this.project,
      startDate: new Date(this.project.startDate),
      endDate: new Date(this.project.endDate),
    });
  }

  private mapVenueToSelectItem(venue: IVenueDto): SelectItem {
    return { label: `${venue.address.city} ${venue.address.urbanDistrict} | ${venue.name}`, value: venue.id };
  }

  private mapParentProjectToSelectItem(project: IProjectDto): SelectItem {
    return { label: project.title, value: project.id };
  }

  onSubmit(): void {
    if (this.formGroup.invalid || this.formGroup.pristine) {
      return;
    }
    const project = { ...this.project, ...this.formGroup.value } as IProjectDto;
    if (this.isNew) {
      this.saveNewProject(project);
    } else {
      this.updateProject(project);
    }
  }

  private saveNewProject(project: IProjectDto): void {
    this.projectService
      .create(project)
      .pipe(first())
      .subscribe((result) => {
        this.notificationsService.success('projects.PROJECT_CREATED');
        this.ref.close(result);
      });
  }

  private updateProject(project: IProjectDto): void {
    this.projectService
      .update(project)
      .pipe(first())
      .subscribe(() => {
        this.notificationsService.success('projects.PROJECT_UPDATED');
        this.ref.close(project);
      });
  }

  cancel(): void {
    this.ref.close(null);
  }
}
