import { AuthService } from './../../../services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from './../../../services/toast.service';
import { UserService } from './../../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';

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
          { provide: ToastService, useValue: {} },
          { provide: LoadingService, useValue: {} },
          { provide: AuthService, useValue: { getMaxRoleLevelOfCurrentUser: () => 0 } },
        ],
      }).compileComponents();
    })
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
