import {TestBed} from '@angular/core/testing';

import {NotificationsService} from './notifications.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateMockModule} from '../../../testing/translate.mock.module';
import {ToastrService} from 'ngx-toastr';
import {NotificationsMockService} from '../../../testing/notifications.mock.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateMockModule
      ],
      providers: [
        TranslateService,
        {provider: ToastrService, useClass: NotificationsMockService}
      ]
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
