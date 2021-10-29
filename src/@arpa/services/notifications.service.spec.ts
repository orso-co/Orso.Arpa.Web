import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateMockModule } from '../../testing/translate.mock.module';
import { MessageService } from 'primeng/api';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateMockModule,
      ],
      providers: [
        TranslateService,
        MessageService,
      ],
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
