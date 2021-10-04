import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { VenueDto } from '../../../../@arpa/models/venueDto';

@Component({
  selector: 'arpa-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {

  project: ProjectDto = this.config.data.project;
  venues: Observable<SelectItem[]> = this.config.data.venues.pipe(map(
    (venues: VenueDto[]) => venues.map((v) => ({
      label: this.getAddress(v),
      value: v.id,
    } as SelectItem)),
  ));
  type: Observable<SelectItem[]> = this.config.data.type;
  genre: Observable<SelectItem[]> = this.config.data.genre;
  state: Observable<SelectItem[]> = this.config.data.state;
  completedOptions: SelectItem[] = [
    { label: this.translate.instant('YES'), value: true },
    { label: this.translate.instant('NO'), value: false },
  ];
  parentProject: Observable<SelectItem[]> = this.config.data.projects.pipe(map(
    (projects: ProjectDto[]) => projects
      .filter((project: ProjectDto) => project !== this.project)
      .map((project) => ({ label: project.title, value: project.id } as SelectItem)),
  ));

  form: FormGroup;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private translate: TranslateService,
  ) {
  }

  get isNew(): boolean {
    return !this.project;
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      isCompleted: [null, [Validators.required]],
    });

    if (!this.isNew) {
      this.form.patchValue({
        ...this.project,
        startDate: new Date(this.project.startDate),
        endDate: new Date(this.project.endDate),
      });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close({ ...this.project, ...this.form.value } as ProjectDto);
  }

  public cancel(): void {
    this.ref.close(null);
  }

  private getAddress(venue: VenueDto): string {
    if (venue.address) {
      const { city, urbanDistrict } = venue.address;
      const comb = `${(city ? city : '')}${(city && urbanDistrict ? ' ' : '')}${urbanDistrict ? urbanDistrict : ''}`;
      return `${comb}${comb ? ' | ' : ''}${venue.name}`;
    } else {
      return venue.name;
    }
  }
}
