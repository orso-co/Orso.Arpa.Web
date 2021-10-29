import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksWidgetComponent } from './tasks-widget.component';

describe('TasksWidgetComponent', () => {
  let component: TasksWidgetComponent;
  let fixture: ComponentFixture<TasksWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksWidgetComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
