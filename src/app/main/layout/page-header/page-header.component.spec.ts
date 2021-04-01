import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/main/layout/page-header/page-header.component.spec.ts
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
=======
import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyComponent ]
>>>>>>> ARPA-250: refactoring project structure:src/app/main/privacy/privacy.component.spec.ts
    })
      .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/main/layout/page-header/page-header.component.spec.ts
    fixture = TestBed.createComponent(PageHeaderComponent);
=======
    fixture = TestBed.createComponent(PrivacyComponent);
>>>>>>> ARPA-250: refactoring project structure:src/app/main/privacy/privacy.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
