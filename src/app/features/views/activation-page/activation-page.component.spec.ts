import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationPageComponent } from './activation-page.component';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';

describe('ActivationComponent', () => {
  let component: ActivationPageComponent;
  let fixture: ComponentFixture<ActivationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivationPageComponent],
      imports: [
        TranslateMockModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
