import { TestBed } from '@angular/core/testing';

import { TopbarService } from './topbar.service';
import { MenuService } from '../menu/menu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from '../../core/services/language.service';
import { TranslateMockModule } from '../../../testing/translate.mock.module';
import { RouteTitleService } from '../../core/services/route-title.service';

describe('TopbarService', () => {
  let service: TopbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateMockModule,
      ],
      providers: [
        {
          provide: MenuService, useValue: {
            add: () => {
            },
          },
        },
        {
          provide: LanguageService, useValue: {
            getLangs: () => [],
          },
        },
        { provide: RouteTitleService, useValue: {} },
      ],
    });
    service = TestBed.inject(TopbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
