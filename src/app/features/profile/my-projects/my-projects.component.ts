import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MeService } from '../../../shared/services/me.service';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { MyProjectDto } from 'src/@arpa/models/myProjectDto';

@Component({
  selector: 'arpa-profile-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements AfterViewInit {
  userProjects$: Observable<MyProjectDto[]> = of([]);
  totalRecordsCount$: Observable<number> = of(0);
  participationStatusInner: Observable<SelectItem[]>;
  itemsPerPage = 10;

  constructor(
    private meService: MeService,
    private route: ActivatedRoute,
    private selectValueService: SelectValueService,
    private notificationsService: NotificationsService,
  ) {
  }

  ngAfterViewInit(): void {
    this.participationStatusInner = this.selectValueService.load('ProjectParticipation', 'ParticipationStatusInner').pipe(
      map(() => this.selectValueService.get('ProjectParticipation', 'ParticipationStatusInner')),
    );
  }

  loadData(take: number, skip: number): void {
    const loadResult$ = this.meService.getMyProjects(take, skip);
    this.userProjects$ = loadResult$.pipe(map((result) => result.userProjects || []));
    this.totalRecordsCount$ = loadResult$.pipe(map((result) => result.totalRecordsCount || 0));
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }


  onParticipationStatusChanged(event: any): void {
    this.meService
      .setProjectParticipationStatus(event.ctx.id, event.value)
      .pipe(first())
      .subscribe(() => {
        event.ctx.predictionId = event.value;
        this.notificationsService.success('profile.PROJECTPARTICIPATION_SET');
      });
  }
}
