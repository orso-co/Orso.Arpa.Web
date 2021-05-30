import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateMockModule} from '../../../testing/translate.mock.module';
import {NotificationsService} from '../../core/services/notifications.service';
import {NotificationsMockService} from '../../../testing/notifications.mock.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './profile.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateMockModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: NotificationsService, useClass: NotificationsMockService },
        {
          provide: ProfileService, useValue: {
            menuEvents: of(),
          },
        },
      ],
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
