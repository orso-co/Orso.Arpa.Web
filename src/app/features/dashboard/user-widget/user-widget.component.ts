import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WidgetStateService } from '../dashboard.component';
import { UserDto } from '../../../../@arpa/models/userDto';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { SetRoleDto } from '../../../../@arpa/models/setRoleDto';
import { Store } from '@ngrx/store';
import { updateUserStats } from '../state/actions/user-stats.actions';
import { WidgetEvents } from '../widget/widget.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { RoleService } from '../../../../@arpa/services/role.service';

interface UserWithStateDto extends UserDto {
  state: string;
}

@Component({
  selector: 'arpa-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss'],
})
export class UserWidgetComponent implements OnDestroy {

  public users: Observable<UserWithStateDto[]>;
  public isMobile: Observable<boolean>;
  public selectedUser: UserDto;
  public selectedUserRoles: string[];
  public roles: Observable<any>;
  public maxRoleLevel: Observable<number>;
  public stateOptions = [
    { label: 'success', value: 'active' },
    { label: 'info', value: 'pending' },
    { label: 'warning', value: 'not_confirmed' },
  ];
  private widgetEvents: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private widgetStateService: WidgetStateService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private roleService: RoleService,
    private userService: UserService,
    private store: Store) {
    this.widgetEvents = this.widgetStateService.events.subscribe(event => {
      if (event === WidgetEvents.RELOAD) {
        this.getUsers();
      }
    });
    this.getUsers();
    this.maxRoleLevel = this.authService.getMaxRoleLevelOfCurrentUser();
    this.roles = this.roleService.loadRoles();
    this.isMobile = breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).pipe(map(({ matches }) => matches));
  }

  edit(event: Event, user: UserDto, panelRef: OverlayPanel) {
    this.selectedUser = user;
    this.selectedUserRoles = user.roleNames as string[];
    panelRef.show(event);
  }

  delete(event: Event, user: UserDto) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: this.translateService.instant('dashboard.PROCEED'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translateService.instant('YES'),
      rejectLabel: this.translateService.instant('NO'),
      accept: () => {
        this.deleteSelectedUser(user);
      },
    });
  }

  hasUserRight(optionLevel: number, maxRoleLevel: number | null): boolean {
    return optionLevel > (maxRoleLevel ?? 0);
  }

  update(panel: OverlayPanel): void {
    panel.hide();
    const dto: SetRoleDto = { userName: this.selectedUser!.userName, roleNames: this.selectedUserRoles };
    this.widgetStateService.showLoaderUntilCompleted(this.userService.setUserRoles(dto)).subscribe(() => {
      this.getUsers();
      this.notificationsService.success('dashboard.USER_ROLES_SET');
    });
  }

  ngOnDestroy(): void {
    this.widgetEvents.unsubscribe();
  }

  private state(user: UserDto): string {
    if (user.emailConfirmed && user.roleNames?.length) {
      return 'active';
    } else if (user.emailConfirmed && !user.roleNames?.length) {
      return 'pending';
    } else {
      return 'not_confirmed';
    }
  }

  private getUsers() {
    this.users = this.widgetStateService.showLoaderUntilCompleted(this.userService.getUsers()).pipe(
      map((users: UserDto[]) => {
        users.forEach((user: any) => {
          user.state = this.state(user);
        });
        return this.updateStats(users) as UserWithStateDto[];
      }),
    );
  }

  private updateStats(users: UserDto[]): UserDto[] {
    let active = 0;
    let notConfirmed = 0;
    let pending = 0;
    const registered = users.length;
    users.forEach(user => {
      if (user.emailConfirmed && user.roleNames?.length) {
        active = active + 1;
      } else if (user.emailConfirmed && !user.roleNames?.length) {
        pending = pending + 1;
      } else {
        notConfirmed = notConfirmed + 1;
      }
    });
    this.store.dispatch(updateUserStats({ stats: { active, notConfirmed, pending, registered } }));
    return users;
  }

  private deleteSelectedUser(user: UserDto): void {
    if (user!.userName) {
      this.widgetStateService.showLoaderUntilCompleted(this.userService.deleteUser(user!.userName))
        .subscribe(() => {
          this.getUsers();
          this.notificationsService.success('dashboard.USER_DELETED');
        });
    }
  }
}
