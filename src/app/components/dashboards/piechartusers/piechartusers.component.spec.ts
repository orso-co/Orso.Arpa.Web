import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartusersComponent } from './piechartusers.component';

describe('PiechartusersComponent', () => {
  let component: PiechartusersComponent;
  let fixture: ComponentFixture<PiechartusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
