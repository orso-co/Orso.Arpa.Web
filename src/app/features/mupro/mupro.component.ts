import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-mupro',
  templateUrl: './mupro.component.html',
  styleUrls: ['./mupro.component.scss'],
})
export class MuproComponent implements OnInit {

  persons: any;
  person: any;
  routeData: any;

  constructor(public route: ActivatedRoute,
              private router: Router,
  ) {
    this.routeData = route.data
      .pipe(map((routeData) => routeData.persons || []))
      .subscribe((persons) => (this.persons = persons.map((person: any) => ({
        ...person,
        filterOption: person.givenName + person.surName,
      }))));
  }

  ngOnInit(): void {
    this.person = this.route.firstChild?.snapshot.params.id;
  }

  public select({ option }: any) {
    this.person = option.id;
    this.router.navigate([option.id], { relativeTo: this.route });
  }
}
