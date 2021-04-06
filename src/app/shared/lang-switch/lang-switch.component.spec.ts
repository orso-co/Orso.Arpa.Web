import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSwitchComponent } from './lang-switch.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateMockModule } from '../../../testing/translate.mock.module';

describe('LangSwitchComponent', () => {
  let component: LangSwitchComponent;
  let fixture: ComponentFixture<LangSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateMockModule,
      ],
      declarations: [LangSwitchComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
