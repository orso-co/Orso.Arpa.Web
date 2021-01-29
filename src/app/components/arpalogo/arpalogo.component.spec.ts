import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArpalogoComponent } from './arpalogo.component';

describe('ArpalogoComponent', () => {
  let component: ArpalogoComponent;
  let fixture: ComponentFixture<ArpalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArpalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArpalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
