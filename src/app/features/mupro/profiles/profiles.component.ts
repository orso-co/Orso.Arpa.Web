import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PersonsService } from '../services/persons.service';
import { PersonDto, MusicianProfileDto } from '@arpa/models';

@Component({
  selector: 'arpa-mupro-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit, OnDestroy {
  public person$: Observable<PersonDto>;
  public musicianProfile$: Observable<MusicianProfileDto>;
  public personId: string;
  public musicianProfileId: string;

  private paramSubscription: Subscription = Subscription.EMPTY;

  constructor(private personService: PersonsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe((params) => {
      if (params.has('personId')) {
        this.personId = params.get('personId') as string;
        this.musicianProfileId = params.get('musicianProfileId') as string;
        this.person$ = this.personService.getPerson(this.personId);
      }
    });

    this.musicianProfile$ = this.route.data.pipe<MusicianProfileDto>(map((data) => data.musicianProfile));
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  getName(person: PersonDto | null) {
    return person ? `${person.givenName} ${person.surname}` : '';
  }
}
