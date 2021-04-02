import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerComponent } from './performer.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { DummyComponent } from '../dummy/dummy.component';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PerformerComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;

  let component: PerformerComponent;
  let fixture: ComponentFixture<PerformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformerComponent, DummyComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateMockModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ projects: [] }),
          },
        },
      ],
    })
      .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
