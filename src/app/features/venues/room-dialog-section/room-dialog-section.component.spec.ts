import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDialogSectionComponent } from './room-dialog-section.component';

describe('RoomDialogSectionComponent', () => {
  let component: RoomDialogSectionComponent;
  let fixture: ComponentFixture<RoomDialogSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomDialogSectionComponent],
    });
    fixture = TestBed.createComponent(RoomDialogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
