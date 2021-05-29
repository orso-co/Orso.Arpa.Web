import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateMockModule } from '../../../testing/translate.mock.module';
import { TranslateService } from '@ngx-translate/core';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateMockModule,
      ],
      providers: [
        TranslateService,
      ],
    });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
