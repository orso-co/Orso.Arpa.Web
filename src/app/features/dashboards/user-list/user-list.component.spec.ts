import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { NotificationsService } from '../../../core/services/notifications.service';
import { UserService } from '../../../core/services/user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { AuthService } from '../../../core/services/auth.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserListComponent],
        providers: [
          { provide: ConfirmationService, useValue: {} },
          { provide: TranslateService, useValue: {} },
          { provide: UserService, useValue: {} },
          { provide: NotificationsService, useValue: {} },
          { provide: LoadingService, useValue: {} },
          { provide: AuthService, useValue: { getMaxRoleLevelOfCurrentUser: () => 0 } },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
