import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDialogEquipmentComponent } from './room-dialog-equipment.component';

describe('RoomDialogEquipmentComponent', () => {
  let component: RoomDialogEquipmentComponent;
  let fixture: ComponentFixture<RoomDialogEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomDialogEquipmentComponent],
    });
    fixture = TestBed.createComponent(RoomDialogEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
