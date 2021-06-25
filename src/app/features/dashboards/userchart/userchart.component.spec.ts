import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserchartComponent } from './userchart.component';

describe('UserchartComponent', () => {
  let component: UserchartComponent;
  let fixture: ComponentFixture<UserchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
