import { ProjectParticipationDto } from '@arpa/models';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColumnDefinition } from '../../../../@arpa/components/table/table.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ParticipationDialogComponent } from '../../participation-dialog/participation-dialog.component';
import { MuproService } from '../services/mupro.service';

@Component({
  selector: 'arpa-mupro-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  columns: ColumnDefinition<ProjectParticipationDto>[] = [
    { label: 'PROJECT', property: 'project.title', type: 'text' },
    { label: 'INVITATION_STATUS', property: 'invitationStatus', type: 'text', show: true },
    { label: 'PARTICIPATIONSTATUS_PERFORMER', property: 'participationStatusInner', type: 'text', show: true },
    { label: 'PARTICIPATIONSTATUS_STAFF', property: 'participationStatusInternal', type: 'text', show: true },
    { label: 'PARTICIPATIONSTATUS_RESULT', property: 'participationStatusResult', type: 'text', show: true },
    { label: 'COMMENT_PERFORMER', property: 'commentByPerformerInner', type: 'text', show: true },
  ];

  personId: string | null;
  musicianProfileId: string | null;
  projectParticipations$: Observable<ProjectParticipationDto[]>;
  private paramSubscription: Subscription | undefined = Subscription.EMPTY;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private translate: TranslateService,
    private muproService: MuproService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.parent?.paramMap.subscribe((params) => {
      this.personId = params.get('personId');
      this.musicianProfileId = params.get('musicianProfileId');
    });

    this.projectParticipations$ = this.route.data.pipe<ProjectParticipationDto[]>(map((data) => data.projectParticipations));
  }

  ngOnDestroy() {
    this.paramSubscription?.unsubscribe();
  }

  openParticipationDialog(projectParticipation: ProjectParticipationDto) {
    const ref = this.dialogService.open(ParticipationDialogComponent, {
      data: { projectParticipation },
      header: this.translate.instant('mupro.EDIT_PARTICIPATION'),
      styleClass: 'form-modal',
      dismissableMask: true,
      width: window.innerWidth > 1000 ? '66%' : '100%',
    });

    ref.onClose.pipe(first()).subscribe(() => {
      this.projectParticipations$ = this.muproService.getProjectParticipations(this.musicianProfileId!);
    });
  }
}
