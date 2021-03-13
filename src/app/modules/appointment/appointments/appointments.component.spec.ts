import { SectionService } from './../../../services/section.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from './../../../services/loading.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from './../../../services/toast.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsComponent } from './appointments.component';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsComponent],
      providers: [
        { provide: AppointmentService, useValue: {} },
        { provide: ToastService, useValue: {} },
        { provide: DialogService, useValue: {} },
        { provide: LoadingService, useValue: {} },
        { provide: SectionService, useValue: { sections$: of([])} },
        { provide: ActivatedRoute, useValue: { data: of({})} },
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
