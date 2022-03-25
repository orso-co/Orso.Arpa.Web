import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeService } from '../../../shared/services/me.service';
import { ProjectDto } from '../../../../@arpa/models/projectDto';
import { SelectValueService } from '../../../shared/services/select-value.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { MyProjectDto } from 'src/@arpa/models/myProjectDto';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'arpa-projects-widget',
  templateUrl: './projects-widget.component.html',
  styleUrls: ['./projects-widget.component.scss'],
})
export class ProjectsWidgetComponent implements AfterViewInit, OnInit {
  myProjects: MyProjectDto[] = [];
  participationStatusInner$: Observable<SelectItem[]>;

  constructor(
    private meService: MeService,
    private route: ActivatedRoute,
    private selectValueService: SelectValueService,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.participationStatusInner$ = this.selectValueService
      .load('ProjectParticipation', 'ParticipationStatusInner')
      .pipe(map(() => this.selectValueService.get('ProjectParticipation', 'ParticipationStatusInner')));
  }

  ngOnInit(): void {
    this.meService.getMyProjects().subscribe((projects) => (this.myProjects = projects));
  }

  getProjectNames(projects: ProjectDto[]): string {
    return projects.map((p) => p.title).join(', ');
  }


}
