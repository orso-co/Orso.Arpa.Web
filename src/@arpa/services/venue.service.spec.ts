import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { VenueService } from './venue.service';

describe('Service: Venue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenueService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([VenueService], (service: VenueService) => {
    expect(service).toBeTruthy();
  }));
});
