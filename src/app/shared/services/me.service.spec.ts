import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MeService } from './me.service';

describe('Service: Me', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([MeService], (service: MeService) => {
    expect(service).toBeTruthy();
  }));
});
