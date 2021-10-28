import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { PersonsService } from '../services/persons.service';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { SectionDto } from '../../../../@arpa/models/sectionDto';
import { ProfileQuery } from './profile.graphql';
import { GraphQlFeedComponent } from '../../../../@arpa/components/graph-ql-feed/graph-ql-feed.component';

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

  private paramSubscription: Subscription = Subscription.EMPTY;
  private routeEventsSubscription: Subscription = Subscription.EMPTY;

  @ViewChild('feedSource') private feedSource: GraphQlFeedComponent;

  constructor(
    private personService: PersonsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      if (params.has('personId')) {
        this.personId = params.get('personId') as string;
        this.person = this.personService.getPerson(this.personId);
      }
    });

    this.routeEventsSubscription = this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation()?.extras as NavigationExtras),
    ).subscribe(({ state }) => {
      if (state && state.refresh) {
        this.feedSource.refresh();
      }
    });

    this.sections = this.route.data.pipe<SectionDto[]>(map((data) => data.sections));
    this.profiles = this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles || []));
    this.profileNav = this.profiles.pipe(
      map((data) =>
        data.map((profile: MusicianProfileDto) => ({
          profile,
          command: (e: any) => this.show(e),
        } as unknown)) as MenuItem[],
      ),
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
    return this.sections.pipe(
      map((sections: SectionDto[]) => sections
        .find(section => section.id === profile.instrumentId)?.name,
      ),
    );
  }

  show(event: any) {
    this.activeIndex = event.index;
  }
}
