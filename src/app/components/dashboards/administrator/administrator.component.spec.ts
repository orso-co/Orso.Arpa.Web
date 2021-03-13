import { SectionService } from './../../../services/section.service';
import { of } from 'rxjs';
import { RoleService } from './../../../services/role.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { AdministratorComponent } from './administrator.component';
import { ActivatedRoute } from '@angular/router';
import {HttpLoaderFactory} from './../../../app.module';
import {HttpClient} from '@angular/common/http';

describe('AdministratorComponent', () => {
  let component: AdministratorComponent;
  let fixture: ComponentFixture<AdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: RoleService, useValue: { roles$: of([]) } },
        { provide: TranslateService, useValue: {get: () => {}} },
        { provide: SectionService, useValue: { getTree: () => {}} },
        { provide: ActivatedRoute, useValue: { data: of({ users: [] }) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
