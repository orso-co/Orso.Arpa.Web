import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import { IProjectDto } from '../../../models/IProjectDto';
import { IVenueDto } from '../../../models/appointment';

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

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (!this.isNew) {
      this.fillForm();
    }
    this.venueOptions = this.venues ? this.venues.map((v) => this.mapVenueToSelectItem(v)) : [];
    this.parentProjectOptions = this.projects ? this.projects.filter(project => project !== this.project)
      .map((p) => this.mapParentProjectToSelectItem(p)) : [];
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
      code: [null, [Validators.required]],
      isCompleted: [null, [Validators.required]]
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
    this.ref.close({ ...this.project, ...this.formGroup.value} as IProjectDto);
  }

  cancel(): void {
    this.ref.close(null);
  }
}
