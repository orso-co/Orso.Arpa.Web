import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { RoleService } from './role.service';

describe('Service: Role', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([RoleService], (service: RoleService) => {
    expect(service).toBeTruthy();
  }));
});
