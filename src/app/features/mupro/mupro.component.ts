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
  person: any;
  mupro: any;
  routeData: any;

  query: DocumentNode = MuproProfilesQuery;
  private routeParamsSubscription: Subscription | undefined;

  constructor(public route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.routeParamsSubscription = this.route.firstChild?.paramMap.subscribe((params) => {
      this.person = params.get('id');
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  public select({ person, id }: any) {
    this.person = person.id;
    this.mupro = id;
    this.router.navigate([person.id], { relativeTo: this.route });
  }
}
