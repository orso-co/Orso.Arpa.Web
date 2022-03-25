import { DialogService } from 'primeng/dynamicdialog';
import { TranslateMockModule } from './../../../../testing/translate.mock.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWidgetComponent } from './projects-widget.component';

describe('ProjectsWidgetComponent', () => {
  let component: ProjectsWidgetComponent;
  let fixture: ComponentFixture<ProjectsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateMockModule,
      ],
      declarations: [ProjectsWidgetComponent],
      providers: [
        { provide: DialogService, useValue: {} },
      ],
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
