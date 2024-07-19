import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMedicalTestComponent } from './print-medical-test.component';

describe('PrintMedicalTestComponent', () => {
  let component: PrintMedicalTestComponent;
  let fixture: ComponentFixture<PrintMedicalTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMedicalTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMedicalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
