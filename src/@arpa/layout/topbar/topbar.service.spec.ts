import { TestBed } from '@angular/core/testing';

import { TopbarService } from './topbar.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateMockModule } from '../../../testing/translate.mock.module';
import { LanguageService } from '../../services/language.service';
import { RouteTitleService } from '../../services/route-title.service';
import { MenuService } from '../../components/menu/menu.service';

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
