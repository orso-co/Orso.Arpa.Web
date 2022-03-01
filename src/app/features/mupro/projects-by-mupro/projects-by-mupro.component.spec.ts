import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsByMuproComponent } from './projects-by-mupro.component';

describe('ProjectsByMuproComponent', () => {
  let component: ProjectsByMuproComponent;
  let fixture: ComponentFixture<ProjectsByMuproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsByMuproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsByMuproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
