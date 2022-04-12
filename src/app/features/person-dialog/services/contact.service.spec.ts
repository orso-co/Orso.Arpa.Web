import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('Service: Contact', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
