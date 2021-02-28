import { LoginComponent } from './../login/login.component';
import { ToastService } from './../../../services/toast.service';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LogoutComponent],
        imports: [RouterTestingModule.withRoutes([{ path: 'onboarding/login', component: LoginComponent }])],
        providers: [
          { provide: AuthService, useValue: { logout: () => of(null) } },
          { provide: ToastService, useValue: { info: () => {} } },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
