import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { IUserDto } from '../../models/IUserDto';
import { MuproService } from './services/mupro.service';
import { of } from 'rxjs';

@Component({
  selector: 'arpa-mupro',
  templateUrl: './mupro.component.html',
  styleUrls: ['./mupro.component.scss'],
})
export class MuproComponent implements OnInit {

  users: any;
  member: any;
  routeData: any;

  constructor(public route: ActivatedRoute, private router: Router, private filter: FilterService, private muproService: MuproService) {
    this.routeData = route.data.pipe(map((routeData) => routeData.users)).subscribe((users) => (this.users = users));
  }

  ngOnInit(): void {
    this.member = this.route.firstChild?.snapshot.params.id;
  }

  public select({ option }: any) {
    this.member = option.id;
    this.muproService.user = of<IUserDto>(option);
    this.router.navigate([option.id], { relativeTo: this.route });
  }
}
