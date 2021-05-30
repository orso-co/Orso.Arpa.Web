import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogComponent } from './audit-log.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {httpLoaderFactory} from '../../core/core.module';
import {HttpClient} from '@angular/common/http';

describe('AuditLogComponent', () => {
  let component: AuditLogComponent;
  let fixture: ComponentFixture<AuditLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditLogComponent ],
      imports: [
        PrimeNgModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
