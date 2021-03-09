import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { MeService } from './me.service';

describe('Service: Me', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([MeService], (service: MeService) => {
    expect(service).toBeTruthy();
  }));
});
