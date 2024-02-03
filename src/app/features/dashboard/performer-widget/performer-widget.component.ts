import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeService } from '@arpa/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface PerformerWidgetLine {
  translationPrefix: string;
  isFullfilled$: Observable<boolean>;
  anchorLabel: string;
  anchorUrl: string;
}

@Component({
  selector: 'arpa-performer-widget',
  templateUrl: './performer-widget.component.html',
  styleUrls: ['./performer-widget.component.scss'],
})
export class PerformerWidgetComponent {
  lines: PerformerWidgetLine[] = [
    {
      translationPrefix: 'COMPLETE_PERSONAL_DATA',
      anchorLabel: 'MY_DATA',
      anchorUrl: '/arpa/profile/my-data',
      isFullfilled$: this.isPersonalDataComplete(),
    },
    {
      translationPrefix: 'COMPLETE_MUSICIANPROFILE',
      anchorLabel: 'MY_MUSICIANPROFILE',
      anchorUrl: '/arpa/profile/musicianprofile',
      isFullfilled$: this.isMusicianProfileComplete(),
    },
    {
      translationPrefix: 'COMPLETE_PROJECTS',
      anchorLabel: 'MY_PROJECTS',
      anchorUrl: '/arpa/profile/my-projects',
      isFullfilled$: of(false),
    },
    {
      translationPrefix: 'COMPLETE_APPOINTMENTS',
      anchorLabel: 'MY_APPOINTMENTS',
      anchorUrl: '/arpa/profile/my-appointments',
      isFullfilled$: of(false),
    },
  ];

  constructor(private router: Router, private meService: MeService) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  isPersonalDataComplete(): Observable<boolean> {
    return this.meService
      .getMyProfile()
      .pipe(
        map(
          (result) =>
            !!result.email &&
            (result.person?.addresses?.length ?? 0) > 0 &&
            !!result.person?.gender &&
            !!result.person?.dateOfBirth &&
            !!result.person?.givenName &&
            !!result.person?.surname
        )
      );
  }

  isMusicianProfileComplete(): Observable<boolean> {
    return this.meService.getMyMusicianProfiles().pipe(map((result) => result.length > 0));
  }
}
