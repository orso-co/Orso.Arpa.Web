import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWidgetComponent } from './projects-widget.component';

describe('ProjectsWidgetComponent', () => {
  let component: ProjectsWidgetComponent;
  let fixture: ComponentFixture<ProjectsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsWidgetComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
