import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoirGridWidgetComponent } from './choir-grid-widget.component';

describe('ChoirGridComponent', () => {
  let component: ChoirGridWidgetComponent;
  let fixture: ComponentFixture<ChoirGridWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoirGridWidgetComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoirGridWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
