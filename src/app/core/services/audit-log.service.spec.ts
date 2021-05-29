import { TestBed } from '@angular/core/testing';

import { AuditLogService } from './audit-log.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuditLogService', () => {
  let service: AuditLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditLogService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuditLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
