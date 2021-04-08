import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {IProjectDto, IVenueDto} from '../../../models/appointment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {first} from 'rxjs/operators';
import {ProjectService} from '../../../core/services/project.service';
import {NotificationsService} from '../../../core/services/notifications.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'arpa-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  project: IProjectDto = this.config.data.project;
  venues: IVenueDto[] = this.config.data.venues;
  venueOptions: SelectItem[] = [];
  parentProjectOptions: IProjectDto[] = this.config.data.parentProjectOptions;
  typeOptions: SelectItem[] = this.config.data.typeOptions;
  genreOptions: SelectItem[] = this.config.data.genreOptions;
  statusOptions: SelectItem[] = this.config.data.statusOptions;

  formGroup: FormGroup;

  get isNew(): boolean {
    return !this.project;
  }

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              public ref: DynamicDialogRef,
              private projectService: ProjectService,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.createForm();
    this.fillForm();
    this.venueOptions = this.venues.map((v) => this.mapVenueToSelectItem(v));
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required]],
      shortTitle: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      description: [null],
      venues: [null],
      typeId: [null, [Validators.required]],
      statusId: [null, [Validators.required]],
      genreId: [null, [Validators.required]],
      parentId: [null],
      isCompleted: [false, [Validators.required]]
    });
  }

  private fillForm(): void {
    this.formGroup.reset({
      ...this.project,
    });
  }

  private mapVenueToSelectItem(venue: IVenueDto): SelectItem {
    return { label: `${venue.address.city} ${venue.address.urbanDistrict} | ${venue.name}`, value: venue.id };
  }

  onSubmit(): void {
    if (this.isNew) {
      this.saveNewProject({ ...this.project, ...this.formGroup.value});
    } else {
      this.updateProject({ ...this.project, ...this.formGroup.value});
    }
  }

  private saveNewProject(project: IProjectDto): void {
    console.log("save new");
    this.projectService.create(project)
      .pipe(first())
      .subscribe((result) => {
        this.notificationsService.success('projects.PROJECT_CREATED');
        this.ref.close(result);
      });
  }

  private updateProject(project: IProjectDto): void {
    console.log("update");
  }

  cancel(): void {
    this.ref.close(null);
  }

}
