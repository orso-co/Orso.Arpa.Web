import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { SelectValueService } from './select-value.service';

describe('Service: SelectValue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectValueService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([SelectValueService], (service: SelectValueService) => {
    expect(service).toBeTruthy();
  }));
});
