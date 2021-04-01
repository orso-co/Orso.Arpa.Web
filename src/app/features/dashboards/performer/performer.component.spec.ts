import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerComponent } from './performer.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { httpLoaderFactory } from '../../../core/core.module';
import { AuthService } from '../../../core/services/auth.service';

describe('PerformerComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;

  let component: PerformerComponent;
  let fixture: ComponentFixture<PerformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformerComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [{ provide: AuthService, useValue: {} }],
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
