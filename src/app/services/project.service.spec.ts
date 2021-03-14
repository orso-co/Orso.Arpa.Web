import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { ProjectService } from './project.service';

describe('Service: Project', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
