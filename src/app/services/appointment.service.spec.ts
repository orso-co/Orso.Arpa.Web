import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { API_URL } from '../models/api-url';
import { AppointmentService } from './appointment.service';

describe('Service: Appointment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentService, { provide: API_URL, useValue: '' }],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([AppointmentService], (service: AppointmentService) => {
    expect(service).toBeTruthy();
  }));
});
