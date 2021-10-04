import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsWidgetComponent } from './appointments-widget.component';

describe('AppointmentsWidgetComponent', () => {
  let component: AppointmentsWidgetComponent;
  let fixture: ComponentFixture<AppointmentsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentsWidgetComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
