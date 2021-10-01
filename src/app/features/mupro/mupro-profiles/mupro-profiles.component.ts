import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PersonsService } from '../services/persons.service';
import { PersonDto } from '../../../model/personDto';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { SectionDto } from '../../../model/sectionDto';

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

  constructor(
    private personService: PersonsService,
    private route: ActivatedRoute,
  ) {
    this.person = personService.getPerson(this.route.snapshot.params?.id);
  }

  ngOnInit(): void {
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
