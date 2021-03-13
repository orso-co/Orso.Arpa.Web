import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ToastService } from './../../../services/toast.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentComponent } from './edit-appointment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditAppointmentComponent', () => {
  let component: EditAppointmentComponent;
  let fixture: ComponentFixture<EditAppointmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, PrimeNgModule, RouterTestingModule, NoopAnimationsModule],
        declarations: [EditAppointmentComponent],
        providers: [
          { provide: DynamicDialogRef, useValue: {} },
          { provide: DynamicDialogConfig, useValue: { data: { appointment: { participations: [] }, venues: [] } } },
          { provide: ToastService, useValue: {} },
          { provide: AppointmentService, useValue: {} },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
