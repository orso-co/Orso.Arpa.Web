import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AdministratorComponent } from './administrator.component';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { SectionService } from '../../../core/services/section.service';


describe('AdministratorComponent', () => {
  let component: AdministratorComponent;
  let fixture: ComponentFixture<AdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: RoleService, useValue: { roles$: of([]) } },
        {
          provide: SectionService, useValue: {
            getTree: () => {
            },
          },
        },
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
