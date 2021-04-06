import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { SelectValueService } from './select-value.service';

describe('Service: SelectValue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectValueService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([SelectValueService], (service: SelectValueService) => {
    expect(service).toBeTruthy();
  }));
});
