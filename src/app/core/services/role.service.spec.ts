import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed, inject } from '@angular/core/testing';
import { RoleService } from './role.service';

describe('Service: Role', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([RoleService], (service: RoleService) => {
    expect(service).toBeTruthy();
  }));
});
