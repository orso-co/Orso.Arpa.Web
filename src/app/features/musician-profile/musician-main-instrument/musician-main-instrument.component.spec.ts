import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicianMainInstrumentComponent } from './musician-main-instrument.component';

describe('MusicianMainInstrumentComponent', () => {
  let component: MusicianMainInstrumentComponent;
  let fixture: ComponentFixture<MusicianMainInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicianMainInstrumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianMainInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
