import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { VenueService } from './venue.service';

describe('Service: Venue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenueService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([VenueService], (service: VenueService) => {
    expect(service).toBeTruthy();
  }));
});
