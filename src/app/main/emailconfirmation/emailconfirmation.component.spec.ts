import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailconfirmationComponent } from './emailconfirmation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IConfirmEmailDto } from 'src/app/models/IConfirmEmailDto';
import { of } from 'rxjs';
import { httpLoaderFactory } from '../../core/core.module';
import { AuthService } from '../../core/services/auth.service';
import { NotificationsService } from '../../core/services/notifications.service';

describe('EmailconfirmationComponent', () => {
  let component: EmailconfirmationComponent;
  let fixture: ComponentFixture<EmailconfirmationComponent>;

  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailconfirmationComponent],
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
        { provide: AuthService, useValue: { confirmMail: (confirmEmail: IConfirmEmailDto) => of(null) } },
        { provide: NotificationsService, useValue: { success: () => of(null) } }],
    })
      .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
