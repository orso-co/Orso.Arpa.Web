import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentNode } from 'graphql';
import { MuproProfilesQuery } from './mupro-profiles.graphql';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arpa-mupro',
  templateUrl: './mupro.component.html',
  styleUrls: ['./mupro.component.scss'],
})
export class MuproComponent implements OnInit, OnDestroy {
  personId: string | null;
  musicianProfileId: string | null;

  query: DocumentNode = MuproProfilesQuery;
  private routeParamsSubscription: Subscription | undefined;

  constructor(public route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.firstChild?.paramMap.subscribe((params) => {
      this.personId = params.get('personId');
      this.musicianProfileId = params.get('musicianProfileId');
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  public select({ person, id }: any) {
    this.personId = person.id;
    this.musicianProfileId = id;
    this.router.navigate([person.id, id], { relativeTo: this.route });
  }
}
