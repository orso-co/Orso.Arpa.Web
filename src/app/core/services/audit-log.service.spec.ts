import { TestBed } from '@angular/core/testing';

import { AuditLogService } from './audit-log.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('AuditLogService', () => {
  let service: AuditLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(AuditLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
