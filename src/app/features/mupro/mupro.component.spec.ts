import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuproComponent } from './mupro.component';

describe('MuproComponent', () => {
  let component: MuproComponent;
  let fixture: ComponentFixture<MuproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
