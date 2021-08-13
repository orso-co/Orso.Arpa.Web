import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MusicianProfileDto } from '../../../model/musicianProfileDto';
import { SectionDto } from '../../../model/sectionDto';

@Component({
  selector: 'arpa-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.scss'],
})
export class MusicianComponent {

  public profiles: Observable<MusicianProfileDto[]>;
  public sections: Observable<SectionDto[]>;

  constructor(private route: ActivatedRoute) {
    this.profiles = this.route.data.pipe<MusicianProfileDto[]>(map((data) => data.profiles));
    this.sections = this.route.data.pipe<SectionDto[]>(map((data) => data.sections));
  }

  getSection(profile: MusicianProfileDto) {
    return this.sections.pipe(
      map((sections: SectionDto[]) => sections
        .find(section => section.id === profile.instrumentId)?.name,
      ),
    );
  }
}
