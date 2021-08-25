/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SectionService } from './section.service';

describe('Service: Section', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([SectionService], (service: SectionService) => {
    expect(service).toBeTruthy();
  }));
});
