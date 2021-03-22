import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { API_URL } from 'src/app/models/api-url';
import { MeService } from 'src/app/services/me.service';
import { ToastService } from 'src/app/services/toast.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let toastService: ToastService;
  let meService: MeService;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        ProfileComponent,
        {provide: MeService},
        {provide: API_URL, useValue: ''},
        {provide: ToastService, useValue: {}}
      ]
    })
    .compileComponents();
    component = TestBed.inject(ProfileComponent);
    toastService = TestBed.inject(ToastService);
    meService = TestBed.inject(MeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('raises error if putProfile fails', async () =>{
  //   component.ngOnInit();
  //   component.userProfile.surname = "";
  //   component.onSubmit();
  //   expect(toastService.error).toBe("profile.ISSUE");
  // })
});
