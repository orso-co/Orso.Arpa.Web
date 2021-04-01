import {TestBed} from '@angular/core/testing';

import {JwtService} from './jwt.service';
import {NotificationsService} from './notifications.service';
import {NotificationsMockService} from '../../../testing/notifications.mock.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtService,
        {provides: NotificationsService, useClass: NotificationsMockService}
      ]
    });
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
