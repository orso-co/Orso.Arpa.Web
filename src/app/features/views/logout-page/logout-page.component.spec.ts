import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LogoutPageComponent } from './logout-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationsService } from '../../../core/services/notifications.service';

describe('LogoutComponent', () => {
  let component: LogoutPageComponent;
  let fixture: ComponentFixture<LogoutPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogoutPageComponent],
        imports: [
          RouterTestingModule.withRoutes([{
            path: 'login',
            redirectTo: '',
          }]),
          HttpClientTestingModule,
        ],
        providers: [
          { provide: AuthService, useValue: { logout: () => of(null) } },
          {
            provide: NotificationsService, useValue: {
              info: () => {
              },
            },
          },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
