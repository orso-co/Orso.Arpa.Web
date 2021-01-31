import { ComponentFixture, TestBed } from '@angular/core/testing';

import {PerformerComponent } from './performer.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('PerformerComponent', () => {
  let component: PerformerComponent;
  let fixture: ComponentFixture<PerformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformerComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
    })
    .compileComponents();
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
