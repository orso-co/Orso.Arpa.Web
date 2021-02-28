import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RegisterConfirmationComponent } from './registerconfirmation.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '../../../app.module';
import { HttpClient} from '@angular/common/http';

describe('RegisterConfirmationComponent', () => {
  let component: RegisterConfirmationComponent;
  let fixture: ComponentFixture<RegisterConfirmationComponent>;

  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterConfirmationComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
    .compileComponents();
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
