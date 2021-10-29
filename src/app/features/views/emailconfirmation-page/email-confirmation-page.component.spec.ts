import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailConfirmationPageComponent } from './email-confirmation-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from '../../../../@arpa/services/auth.service';
import { NotificationsService } from '../../../../@arpa/services/notifications.service';
import { ConfirmEmailDto } from '../../../../@arpa/models/confirmEmailDto';
import { httpLoaderFactory } from '../../../../@arpa/translate/translate.module';

describe('EmailconfirmationComponent', () => {
  let component: EmailConfirmationPageComponent;
  let fixture: ComponentFixture<EmailConfirmationPageComponent>;

  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmationPageComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        { provide: AuthService, useValue: { confirmMail: (confirmEmail: ConfirmEmailDto) => of(null) } },
        { provide: NotificationsService, useValue: { success: () => of(null) } }],
    })
      .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
