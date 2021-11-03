import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateBadgeComponent } from './state-badge.component';

describe('StatusBadgeComponent', () => {
  let component: StateBadgeComponent;
  let fixture: ComponentFixture<StateBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StateBadgeComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
