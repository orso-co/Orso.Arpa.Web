import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectgenrechartComponent } from './projectgenrechart.component';

describe('ProjectgenrechartComponent', () => {
  let component: ProjectgenrechartComponent;
  let fixture: ComponentFixture<ProjectgenrechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectgenrechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectgenrechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
