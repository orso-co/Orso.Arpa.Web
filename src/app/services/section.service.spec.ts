/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { SectionService } from './section.service';

describe('Service: Section', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([SectionService], (service: SectionService) => {
    expect(service).toBeTruthy();
  }));
});
