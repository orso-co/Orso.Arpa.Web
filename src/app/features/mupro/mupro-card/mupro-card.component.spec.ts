import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuproCardComponent } from './mupro-card.component';

describe('CardComponent', () => {
  let component: MuproCardComponent;
  let fixture: ComponentFixture<MuproCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuproCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuproCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
