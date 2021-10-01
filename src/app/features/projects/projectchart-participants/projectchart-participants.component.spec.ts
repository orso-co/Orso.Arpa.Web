import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectchartParticipantsComponent } from './projectchart-participants.component';

describe('ProjectchartParticipantsComponent', () => {
  let component: ProjectchartParticipantsComponent;
  let fixture: ComponentFixture<ProjectchartParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectchartParticipantsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectchartParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
