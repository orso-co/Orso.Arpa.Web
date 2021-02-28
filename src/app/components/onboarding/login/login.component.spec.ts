import { AuthService } from './../../../services/auth.service';
import { ToastService } from './../../../services/toast.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

import { HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';
import { ErrorInterceptor } from './../../../interceptors/error.interceptor';

describe('LoginComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        {provide: AuthService, useValue: {}},
        {provide: ToastService, useValue: {}},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, }, ]
    })
    .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
