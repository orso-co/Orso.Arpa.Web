import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailConfirmationComponent } from './email-confirmation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { ConfirmEmailDto } from '../../model/confirmEmailDto';
import { httpLoaderFactory } from '../../common/translate/translate.module';

describe('EmailconfirmationComponent', () => {
  let component: EmailConfirmationComponent;
  let fixture: ComponentFixture<EmailConfirmationComponent>;

  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmationComponent],
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
    fixture = TestBed.createComponent(EmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
