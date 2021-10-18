import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PersonsService } from '../services/persons.service';
import { PersonDto } from '../../../../@arpa/models/personDto';
import { MusicianProfileDto } from '../../../../@arpa/models/musicianProfileDto';
import { SectionDto } from '../../../../@arpa/models/sectionDto';
import { ProfileQuery } from './profile.graphql';


@Component({
  selector: 'arpa-mupro-profiles',
  templateUrl: './mupro-profiles.component.html',
  styleUrls: ['./mupro-profiles.component.scss'],
})
export class MuproProfilesComponent implements OnInit {

  public person: Observable<PersonDto>;
  public profileNav: Observable<MenuItem[]>;
  public profiles: Observable<MusicianProfileDto[]>;
  public sections: Observable<SectionDto[]>;
  public activeIndex = 0;
  public query = ProfileQuery;
  public personId: string;

  constructor(
    private personService: PersonsService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('personId')) {
        this.personId = params.get('personId') as string;
        this.person = this.personService.getPerson(this.personId);
      }
    });
    this.sections = this.route.data.pipe<SectionDto[]>(map((data) => data.sections));
    this.profiles = this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles || []));
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

  editProfile(profile: MusicianProfileDto) {
  }
}
