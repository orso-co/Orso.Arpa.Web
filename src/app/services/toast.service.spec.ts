import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TestBed, inject } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('Service: Toast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, { provide: ToastrService, useValue: {} }, { provide: TranslateService, useValue: {} }],
    });
  });

  it('should ...', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
