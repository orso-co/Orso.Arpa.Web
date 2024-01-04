import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { ProjectDto } from '@arpa/models';
import { ParentProjectsQuery } from './projectParents.graphql';
import { FeedScope } from '../../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { EnumService } from '@arpa/services';
import { ProjectsQueryResponse } from '../../project-list/projects.graphql';

@Component({
  selector: 'arpa-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  parentProjectsQuery = ParentProjectsQuery;
  @Input() project: ProjectsQueryResponse;
  @Input() venues: SelectItem[];
  @Input() type: SelectItem[];
  @Input() genre: SelectItem[];
  projectStatusOptions$: Observable<SelectItem[]>;

  // Info: In this component "translate.instant" is used. This will not update the translations on language change
  completedOptions: SelectItem[] = [
    { label: this.translate.instant('YES'), value: true },
    { label: this.translate.instant('NO'), value: false },
  ];

  form: UntypedFormGroup;
  parentProjectList = new BehaviorSubject([]);

  constructor(
    private formBuilder: UntypedFormBuilder,
    public ref: DynamicDialogRef,
    private translate: TranslateService,
    private enumService: EnumService
  ) {
    this.projectStatusOptions$ = this.enumService.getProjecttatusSelectItems();
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      shortTitle: [null, [Validators.required]],
      startDate: [null],
      endDate: [null],
      description: [null],
      typeId: [null],
      status: [null],
      genreId: [null],
      parentId: [null],
      code: [null, [Validators.required]],
      isCompleted: [null, [Validators.required]],
      isHiddenForPerformers: [false],
    });
  }

  get isNew(): boolean {
    return !this.project;
  }

  public ngOnInit(): void {
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
      map((projects) =>
        projects
          .filter(({ id }) => (!this.project ? true : id !== this.project.id))
          .map((project) => ({ label: project.title, value: project.id } as SelectItem))
      )
    );
  }

  public onSubmit(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.ref.close({ ...this.form.value } as ProjectDto);
  }

  public cancel(): void {
    this.ref.close(null);
  }
}
