import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { IMusicianProfileDto, IPersonDto } from '../../../models/appointment';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PersonsService } from '../services/persons.service';
import { ISectionDto } from '../../../models/section';

@Component({
  selector: 'arpa-mupro-profiles',
  templateUrl: './mupro-profiles.component.html',
  styleUrls: ['./mupro-profiles.component.scss'],
})
export class MuproProfilesComponent implements OnInit {

  public person: Observable<IPersonDto>;
  public profileNav: Observable<MenuItem[]>;
  public profiles: Observable<IMusicianProfileDto[]>;
  public sections: Observable<ISectionDto[]>;
  public activeIndex = 0;

  constructor(
    private personService: PersonsService,
    private route: ActivatedRoute,
  ) {
    this.person = personService.getPerson(this.route.snapshot.params?.id);
  }

  ngOnInit(): void {
    this.sections = this.route.data.pipe<ISectionDto[]>(map((data) => data.sections));
    this.profiles = this.route.data.pipe<IMusicianProfileDto[]>(map((data) => data.profiles || []));
    this.profileNav = this.profiles.pipe(
      map((data) =>
        data.map((profile: IMusicianProfileDto) => ({
          profile,
          command: (e: any) => this.show(e),
        } as unknown)) as MenuItem[],
      ),
    );
  }

  getName(person: IPersonDto | null) {
    return person ? `${person.givenName} ${person.surname}` : '';
  }

  getSection(profile: IMusicianProfileDto) {
    return this.sections.pipe(
      map((sections: ISectionDto[]) => sections
        .find(section => section.id === profile.instrumentId)?.name,
      ),
    );
  }

  show(event: any) {
    this.activeIndex = event.index;
  }

  editProfile(profile: IMusicianProfileDto) {
    console.log(profile);
  }

}
