import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateMockModule} from '../../../testing/translate.mock.module';
import {NotificationsService} from '../../core/services/notifications.service';
import {NotificationsMockService} from '../../../testing/notifications.mock.service';

describe('AppointmentsComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateMockModule,
      ],
      providers: [{provide: NotificationsService, useClass: NotificationsMockService}],
      declarations: [ProfileComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
