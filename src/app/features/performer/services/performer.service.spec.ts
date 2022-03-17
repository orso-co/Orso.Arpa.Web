import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { PerformerService } from './performer.service';

describe('Service: Performer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformerService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([PerformerService], (service: PerformerService) => {
    expect(service).toBeTruthy();
  }));
});
