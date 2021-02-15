import { IUserDto } from './../../../models/IUserDto';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {
  users$: Observable<IUserDto[]>;

  constructor(route: ActivatedRoute) {
    this.users$ = route.data.pipe(map(routeData => routeData.users));
  }

  ngOnInit(): void {
  }

}
