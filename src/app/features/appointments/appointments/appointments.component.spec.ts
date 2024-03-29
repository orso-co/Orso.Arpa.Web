import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppointmentsComponent } from './appointments.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../../@arpa/services/appointment.service';
import { NotificationsMockService } from '../../../../testing/notifications.mock.service';
import { LoadingService } from '@arpa/services';
import { SectionService } from '@arpa/services';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsComponent],
      providers: [
        { provide: AppointmentService, useValue: {} },
        { provide: NotificationsMockService },
        { provide: DialogService, useValue: {} },
        { provide: LoadingService, useValue: {} },
        { provide: SectionService, useValue: { sectionsAll$: of([]) } },
        { provide: ActivatedRoute, useValue: { data: of({}) } },
      ],
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateMockModule],
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
