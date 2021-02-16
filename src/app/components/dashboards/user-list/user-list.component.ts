import { SubSink } from 'subsink';
import { UserService } from './../../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { IUserDto } from './../../../models/IUserDto';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { orderBy } from 'lodash-es';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'arpa-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnDestroy, OnChanges {
  @Input() users: IUserDto[] | null = [];
  @Output() userDeleted = new EventEmitter<string>();
  usersWithoutRole: IUserDto[] | undefined = [];
  selectedUser: IUserDto | null = null;
  private subs = new SubSink();

  constructor(
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private userService: UserService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty('users') && this.users) {
      this.usersWithoutRole = orderBy(this.users, (user) => user.createdAt, 'desc');
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getInitials(user: IUserDto): string {
    return `${user.displayName
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('')}`;
  }

  onSelected(event: any, panel: any): void {
    this.selectedUser = event.option;
    panel.toggle(event.originalEvent);
  }

  showDeleteConfirmation(event: Event) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: this.translateService.instant('userlist.PROCEED'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSelectedUser();
      },
    });
  }

  private deleteSelectedUser(): void {
    this.userService.deleteUser(this.selectedUser!.userName).subscribe(() => {
      this.userDeleted.emit(this.selectedUser!.userName);
    });
  }
}
