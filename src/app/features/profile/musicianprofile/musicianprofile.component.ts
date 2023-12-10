import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MyMusicianProfileDto } from '@arpa/models';

@Component({
  selector: 'arpa-musicianprofile',
  templateUrl: './musicianprofile.component.html',
  styleUrls: ['./musicianprofile.component.scss'],
})
export class MusicianprofileComponent {
  public profiles: Observable<MyMusicianProfileDto[]>;
  public deactivatedProfiles: Observable<MyMusicianProfileDto[]>;

  constructor(private route: ActivatedRoute) {
    this.profiles = this.route.data.pipe<MyMusicianProfileDto[]>(
      map((data) => data.profiles.filter(({ deactivation }: MyMusicianProfileDto) => deactivation === null))
    );

    this.deactivatedProfiles = this.route.data.pipe<MyMusicianProfileDto[]>(
      map((data) => data.profiles.filter(({ deactivation }: MyMusicianProfileDto) => deactivation !== null))
    );
  }
}
