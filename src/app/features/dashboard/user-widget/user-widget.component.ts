import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WidgetStateService } from '../dashboard.component';
import { map, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SetRoleDto, UserDto, UserStatus } from '@arpa/models';
import { Store } from '@ngrx/store';
import { updateUserStats } from '../state/actions/user-stats.actions';
import { WidgetEvents } from '../widget/widget.component';
import { UserService } from '../services/user.service';
import { RoleService, AuthService, NotificationsService } from '@arpa/services';

@Component({
  selector: 'arpa-user-layout-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss'],
})
export class UserWidgetComponent implements OnDestroy {
  public users$: Observable<UserDto[]>;
  public isMobile$: Observable<boolean>;
  public selectedUser: UserDto;
  public selectedUserRoles: string[];
  public roles$: Observable<any>;
  public maxRoleLevel$: Observable<number>;
  public selectedUserStatus: UserStatus | undefined = UserStatus.AWAITING_ROLE_ASSIGNMENT;
  public stateOptions = [
    { label: 'success', value: UserStatus.ACTIVE },
    { label: 'info', value: UserStatus.AWAITING_EMAIL_CONFIRMATION },
    { label: 'warning', value: UserStatus.AWAITING_ROLE_ASSIGNMENT },
  ];
  private widgetEvents: Subscription;

  constructor(
    breakpointObserver: BreakpointObserver,
    private widgetStateService: WidgetStateService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private roleService: RoleService,
    private userService: UserService,
    private store: Store
  ) {
    this.widgetEvents = this.widgetStateService.events.subscribe((event) => {
      if (event === WidgetEvents.RELOAD) {
        this.getUsers();
      }
    });
    this.getUsers();
    this.maxRoleLevel$ = this.authService.getMaxRoleLevelOfCurrentUser();
    this.roles$ = this.roleService.getRoles();
    this.isMobile$ = breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).pipe(map(({ matches }) => matches));
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

  public getUsers() {
    this.users$ = this.widgetStateService.showLoaderUntilCompleted(
      this.userService.getUsers(false, this.selectedUserStatus).pipe(tap((users) => this.updateStats(users)))
    );
  }

  private updateStats(users: UserDto[]): UserDto[] {
    const active = users.filter((u) => u.status === UserStatus.ACTIVE).length;
    const awaitingEmailConfirmation = users.filter((u) => u.status === UserStatus.AWAITING_EMAIL_CONFIRMATION).length;
    const awaitingRoleAssignment = users.filter((u) => u.status === UserStatus.AWAITING_ROLE_ASSIGNMENT).length;
    const registered = users.length;
    this.store.dispatch(updateUserStats({ stats: { active, awaitingEmailConfirmation, awaitingRoleAssignment, registered } }));
    return users;
  }

  private deleteSelectedUser(user: UserDto): void {
    if (user!.userName) {
      this.widgetStateService.showLoaderUntilCompleted(this.userService.deleteUser(user!.userName)).subscribe(() => {
        this.getUsers();
        this.notificationsService.success('dashboard.USER_DELETED');
      });
    }
  }
}
