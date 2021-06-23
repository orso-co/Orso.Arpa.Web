import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegErrorComponent } from './reg-error.component';

describe('RegErrorComponent', () => {
  let component: RegErrorComponent;
  let fixture: ComponentFixture<RegErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
