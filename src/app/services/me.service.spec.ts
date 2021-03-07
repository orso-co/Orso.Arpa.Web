/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeService } from './me.service';

describe('Service: Me', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeService]
    });
  });

  it('should ...', inject([MeService], (service: MeService) => {
    expect(service).toBeTruthy();
  }));
});
