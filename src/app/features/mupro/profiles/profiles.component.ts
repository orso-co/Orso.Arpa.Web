import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../../shared/services/project.service';
import { DialogService } from 'primeng/dynamicdialog';
import { InvitationDialogComponent } from '../invitation-dialog/invitation-dialog.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concat, Observable, of, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { catchError, filter, first, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { PersonsService } from '../services/persons.service';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { SectionDto } from '../../../../@arpa/models/sectionDto';
import { ProfileQuery } from './profile.graphql';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';
import { ProjectDto } from 'src/@arpa/models/projectDto';

@Component({
  selector: 'arpa-mupro-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit, OnDestroy {
  public person: Observable<PersonDto>;
  public profileNav: Observable<MenuItem[]>;
  public profiles: Observable<MusicianProfileDto[]>;
  public sections: Observable<SectionDto[]>;
  public activeIndex = 0;
  public query = ProfileQuery;
  public personId: string;
  projects: ProjectDto[] = [];

  private paramSubscription: Subscription = Subscription.EMPTY;
  private routeEventsSubscription: Subscription = Subscription.EMPTY;

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private personService: PersonsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private projectService: ProjectService,
    private translate: TranslateService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      if (params.has('personId')) {
        this.personId = params.get('personId') as string;
        this.person = this.personService.getPerson(this.personId);
      }
    });

    this.routeEventsSubscription = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        map(() => this.router.getCurrentNavigation()?.extras as NavigationExtras)
      )
      .subscribe(({ state }) => {
        if (state && state.refresh) {
          this.feedSource.refresh();
        }
      });

    this.sections = this.route.data.pipe<SectionDto[]>(map((data) => data.sections));
    this.profiles = this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles || []));
    this.projectService.load(false).subscribe((projects) => (this.projects = projects));

    this.profileNav = this.profiles.pipe(
      map(
        (data) =>
          data.map(
            (profile: MusicianProfileDto) =>
              ({
                profile,
                command: (e: any) => this.show(e),
              } as unknown)
          ) as MenuItem[]
      )
    );
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
    this.routeEventsSubscription.unsubscribe();
  }

  getName(person: PersonDto | null) {
    return person ? `${person.givenName} ${person.surname}` : '';
  }

  getSection(profile: MusicianProfileDto) {
    return this.sections.pipe(map((sections: SectionDto[]) => sections.find((section) => section.id === profile.instrumentId)?.name));
  }

  show(event: any) {
    this.activeIndex = event.index;
  }

  openInvitationDialog(musicianProfileId: string) {
    const ref = this.dialogService.open(InvitationDialogComponent, {
      data: {
        musicianProfileId,
        projects: this.projects,
      },
      header: this.translate.instant('projects.INVITE_MUSICIAN_PROFILE'),
      styleClass: 'form-modal',
      dismissableMask: true,
    });

    ref.onClose.pipe(first()).subscribe((result) => {
      if (result) {
        const obs$: Observable<{ projectId: string; error?: any }>[] = [];

        result.projects.forEach((projectId: string) =>
          obs$.push(
            this.projectService
              .setParticipation(projectId, {
                musicianProfileId,
                participationStatusInternalId: 'b0dcb5e9-bbc6-4004-b9d7-0f6723416b9b',
                invitationStatusId: '2a5f85e6-a7ed-48eb-852c-0b191d7ba949',
              })
              .pipe(
                catchError((err) =>
                  of(err).pipe(
                    map((err) => {
                      return { projectId: projectId, error: err };
                    })
                  )
                ),
                map(() => ({ projectId }))
              )
          )
        );

        let successfulCount = 0;

        concat(...obs$).subscribe(
          (next) => {
            if (next.error) {
              this.notificationsService.error(next.error);
            } else {
              successfulCount++;
            }
          },
          (error) => {
            this.notificationsService.error(error);
          },
          () => {
            console.log(successfulCount); // ToDo: Anzahl in Notification aufnehmen
            this.notificationsService.success('projects.SET_PARTICIPATION_STATUS');
            this.router.navigate([this.router.url]);
          }
        );
      }
    });
  }
}
