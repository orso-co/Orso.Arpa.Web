import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegErrorPageComponent } from './reg-error-page.component';
import { TranslateMockModule } from '../../../../testing/translate.mock.module';

describe('RegErrorComponent', () => {
  let component: RegErrorPageComponent;
  let fixture: ComponentFixture<RegErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegErrorPageComponent],
      imports: [
        TranslateMockModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
