import { TestBed } from '@angular/core/testing';

import { RouteTitleService } from './route-title.service';
import { TranslateMockModule } from '../../testing/translate.mock.module';

describe('RouteTitleService', () => {
  let service: RouteTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateMockModule,
      ],
    });
    service = TestBed.inject(RouteTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
