import { waitForAsync } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DummyComponent } from '../../../shared/dummy/dummy.component';
import {DialogService} from 'primeng/dynamicdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          TranslateMockModule,
          HttpClientTestingModule,
        ],
        declarations: [ProjectListComponent, DummyComponent],
        providers: [
          { provide: DialogService, useValue: {} },
          { provide: ActivatedRoute, useValue: { data: of({})} },
        ],
      }).compileComponents();
    }),
  );


  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    component.projects = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
