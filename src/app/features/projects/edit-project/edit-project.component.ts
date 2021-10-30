import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { VenueDto } from '../../../../@arpa/models/venueDto';
import { ParentProjectsQuery } from './projectParents.graphql';
import { FeedScope } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';

@Component({
  selector: 'arpa-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {

  parentProjectsQuery = ParentProjectsQuery;

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

  form: FormGroup;
  parentProjectList = new BehaviorSubject([]);

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
        startDate: new Date(this.project?.startDate || 0),
        endDate: new Date(this.project?.endDate || 0),
      });
    }
  }

  public transformFeedResult(feed: FeedScope): Observable<SelectItem[]> {
    return feed.values.pipe(
      map(projects => projects
        .filter(({ id }) => !this.project ? true : (id !== this.project.id))
        .map(project => ({ label: project.title, value: project.id } as SelectItem)),
      ),
    );
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
      return venue?.name || '';
    }
  }
}
