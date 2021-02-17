import { IUserDto } from './../../../models/IUserDto';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'arpa-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
users$: Observable<IUserDto[]>;

  constructor(route: ActivatedRoute) {
    this.users$ = route.data.pipe(map(routeData => routeData.useres));
   }

  ngOnInit(): void {
  }

}
