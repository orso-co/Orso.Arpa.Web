/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VenueService } from './venue.service';

describe('Service: Venue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenueService]
    });
  });

  it('should ...', inject([VenueService], (service: VenueService) => {
    expect(service).toBeTruthy();
  }));
});
