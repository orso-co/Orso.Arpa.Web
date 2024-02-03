import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeService } from '@arpa/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface PerformerWidgetLine {
  label: string;
  description?: string;
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
      label: 'Persönliche Daten vervollständigen',
      description: 'Für die Verwaltung des Chors und Orchesters und die Planung von Terminen benötigen wir einige Informationen von dir.',
      anchorLabel: 'Meine Daten',
      anchorUrl: '/arpa/profile/my-data',
      isFullfilled$: this.isPersonalDataComplete(),
    },
    {
      label: 'Musikerprofile anlegen',
      description:
        'Damit wir dich als Mitwirkende*n einplanen können, benötigen wir Informationen zu den Instrumenten, die du spielst bzw. den Stimmen, die du singst.',
      anchorLabel: 'Mein Musikerprofil',
      anchorUrl: '/arpa/profile/musicianprofile',
      isFullfilled$: this.isMusicianProfileComplete(),
    },
    {
      label: 'Für Projekte anmelden',
      description: 'Um an Projektterminen teilnehmen zu können, musst du dich zuerst für das jeweilige Projekt anmelden.',
      anchorLabel: 'Meine Projekte',
      anchorUrl: '/arpa/profile/my-projects',
      isFullfilled$: of(false),
    },
    {
      label: 'Für Termine anmelden',
      description: 'Für die Planung unserer Proben und Auftritte ist es wichtig, dass du dich für die Termine anmeldest.',
      anchorLabel: 'Meine Termine',
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
