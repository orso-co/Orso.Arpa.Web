/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectValueService } from './select-value.service';

describe('Service: SelectValue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectValueService]
    });
  });

  it('should ...', inject([SelectValueService], (service: SelectValueService) => {
    expect(service).toBeTruthy();
  }));
});
