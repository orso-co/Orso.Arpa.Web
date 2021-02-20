import { ISectionTreeDto } from './../../../models/section';
import { LoadingService } from './../../../services/loading.service';
import { Observable } from 'rxjs';
import { ISetRoleDto } from './../../../models/ISetRoleDto';
import { AuthService } from './../../../services/auth.service';
import { IRoleDto } from './../../../models/IRoleDto';
import { ToastService } from './../../../services/toast.service';
import { SubSink } from 'subsink';
import { UserService } from './../../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { IUserDto } from './../../../models/IUserDto';
import { Component, EventEmitter, Input, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { orderBy } from 'lodash-es';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'arpa-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnDestroy, OnChanges {
  @Input() users: IUserDto[] | null = [];
  @Input() roles: IRoleDto[] = [];
  @Input() sectionTree: ISectionTreeDto | undefined;
  @Output() userDeleted = new EventEmitter<string>();
  @Output() rolesSet = new EventEmitter<ISetRoleDto>();
  usersWithoutRole: IUserDto[] | undefined = [];
  selectedUser: IUserDto | null = null;
  selectedRoles: string[] = [];
  maxRoleLevel$: Observable<number>;
  selectedUserSections: TreeNode[] = [];
  private subs = new SubSink();

  constructor(
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.maxRoleLevel$ = this.authService.getMaxRoleLevelOfCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('users') && this.users) {
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
    this.selectedRoles = this.selectedUser!.roleNames;
    this.selectedUserSections = this.mapSectionTree(this.sectionTree!, event.option.stakeholderGroupIds);
    panel.toggle(event.originalEvent);
  }

  saveRoles(panel: OverlayPanel): void {
    const dto: ISetRoleDto = { userName: this.selectedUser!.userName, roleNames: this.selectedRoles };
    this.subs.add(
      this.loadingService.showLoaderUntilCompleted(this.authService.setUserRoles(dto)).subscribe(() => {
        this.rolesSet.emit(dto);
        this.reset();
        panel.hide();
        this.toastService.success('userlist.USER_ROLES_SET');
      })
    );
  }

  showDeleteConfirmation(event: Event): void {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: this.translateService.instant('userlist.PROCEED'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translateService.instant('YES'),
      rejectLabel: this.translateService.instant('NO'),
      accept: () => {
        this.deleteSelectedUser();
      },
    });
  }

  hasUserRight(optionLevel: number, maxRoleLevel: number | null): boolean {
    return optionLevel > (maxRoleLevel ?? 0);
  }

  getSections(stakeholderGoupIds: string[]): TreeNode[] {
    return this.mapSectionTree(this.sectionTree!, stakeholderGoupIds);
  }

  private reset(): void {
    this.selectedUser = null;
    this.selectedRoles = [];
    this.selectedUserSections = [];
  }

  private deleteSelectedUser(): void {
    this.subs.add(
      this.loadingService.showLoaderUntilCompleted(this.userService.deleteUser(this.selectedUser!.userName)).subscribe(() => {
        this.userDeleted.emit(this.selectedUser!.userName);
        this.reset();
        this.toastService.success('userlist.USER_DELETED');
      })
    );
  }

  private mapSectionTree(sectionTree: ISectionTreeDto, stakeholderGoupIds: string[]): TreeNode[] {
    return sectionTree.children.map((child) => this.mapSectionNode(child, stakeholderGoupIds));
  }

  private mapSectionNode(sectionNode: ISectionTreeDto, stakeholderGoupIds: string[]): TreeNode {
    return {
      data: sectionNode.data,
      children: sectionNode.children.map((child) => this.mapSectionNode(child, stakeholderGoupIds)),
      label: sectionNode.data?.name,
      leaf: sectionNode.isLeaf,
      key: sectionNode.data!.id,
      icon: stakeholderGoupIds.includes(sectionNode.data!.id) ? 'pi pi-check' : undefined,
      draggable: false,
      droppable: false,
      selectable: false,
    };
  }
}
