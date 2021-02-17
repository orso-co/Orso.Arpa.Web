// Wolfs erster Versuch Miras user-list component nachzubauen um später als user-liste
// für "recent activities" in spalte 3 des staff dashboards zu verwenden.
import { IUserDto } from './../../../models/IUserDto';
import { Component, Input, OnInit } from '@angular/core';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'arpa-user-list-recent',
  templateUrl: './user-list-recent.component.html',
  styleUrls: ['./user-list-recent.component.css']
})
export class UserListRecentComponent implements OnInit {
  @Input() users: IUserDto[] | null = [];
  usersWithoutRole: IUserDto[] | undefined = [];
  selectedUser: IUserDto | null = null;

  ngOnInit(): void {
    this.usersWithoutRole = orderBy(
      this.users?.filter((u) => u.roleNames.length === 0),
      (user) => user.createdAt,
      'desc'
    );
  }

  getInitials(user: IUserDto): string {
    return `${user.displayName.split(' ').map(name => name[0].toUpperCase()).join('')}`;
  }

  onUserSelected(): void {
    alert(`User ${this.selectedUser?.displayName} is now selected`);
  }
}
