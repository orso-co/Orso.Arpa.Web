import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoirGridComponent } from './choir-grid.component';

describe('ChoirGridComponent', () => {
  let component: ChoirGridComponent;
  let fixture: ComponentFixture<ChoirGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoirGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoirGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
