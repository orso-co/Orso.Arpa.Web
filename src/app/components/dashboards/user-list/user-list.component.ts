import { IUserDto } from './../../../models/IUserDto';
import { Component, Input, OnInit } from '@angular/core';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'arpa-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: IUserDto[] | null = [];
  usersWithoutRole: IUserDto[] | undefined = [];
  selectedUser: IUserDto | null = null;

  ngOnInit(): void {
    this.usersWithoutRole = orderBy(
      this.users,
      (user) => user.createdAt,
      'desc'
    );
  }

  getInitials(user: IUserDto): string {
    return `${user.displayName
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('')}`;
  }

  onSelected(event: any, panel: any): void {
    console.log(event);
    this.selectedUser = event.option;
    panel.toggle(event.originalEvent);
  }
}
