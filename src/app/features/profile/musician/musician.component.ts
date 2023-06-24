import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MusicianProfileDto } from '@arpa/models';

@Component({
  selector: 'arpa-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss'],
})
export class MusicianComponent {
  public profiles: Observable<MusicianProfileDto[]>;
  public deactivatedProfiles: Observable<MusicianProfileDto[]>;

  constructor(private route: ActivatedRoute) {
    this.profiles = this.route.data.pipe<MusicianProfileDto[]>(
      map((data) => data.profiles.filter(({ deactivation }: MusicianProfileDto) => deactivation === null))
    );

    this.deactivatedProfiles = this.route.data.pipe<MusicianProfileDto[]>(
      map((data) => data.profiles.filter(({ deactivation }: MusicianProfileDto) => deactivation !== null))
    );
  }
}
