import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { gql } from 'apollo-angular';
import { DocumentNode } from 'graphql';


const MusicianProfiles = gql`
  query Musicians($searchQuery: String, $cursor: String){
    musicianProfiles(first:50, after: $cursor,  where: {
      isMainProfile: { equals: true },
      or: [
        { instrument: {name: {contains: $searchQuery}} },
        { person: {
          or: [
            { surname: {contains: $searchQuery } },
            { givenName: {contains: $searchQuery } }
          ]
        }}
      ]
    }
    ) {
      pageInfo {
        hasNextPage,
        startCursor,
        endCursor,
        hasPreviousPage
      }

      edges {
        cursor
        node{
          isMainProfile,
          person {
            id,
            givenName,
            surname,
            addresses {
              country,
              city
            }
          }
          instrument {
            name,
            createdAt
          }
        }
      }
    }
  }`;

@Component({
  selector: 'arpa-mupro',
  templateUrl: './mupro.component.html',
  styleUrls: ['./mupro.component.scss'],
})
export class MuproComponent implements OnInit {

  persons: any;
  person: any;
  routeData: any;

  query: DocumentNode = MusicianProfiles;

  constructor(public route: ActivatedRoute,
              private router: Router,
  ) {

    this.routeData = route.data
      .pipe(map((routeData) => routeData.persons || []))
      .subscribe((persons) => (this.persons = persons.map((person: any) => ({
        ...person,
        filterOption: person.givenName + ' ' + person.surname,
      }))));
  }

  ngOnInit(): void {
    this.person = this.route.firstChild?.snapshot.params.id;
  }

  public select({ option }: any) {
    this.person = option.person.id;
    this.router.navigate([option.person.id], { relativeTo: this.route });
  }
}
