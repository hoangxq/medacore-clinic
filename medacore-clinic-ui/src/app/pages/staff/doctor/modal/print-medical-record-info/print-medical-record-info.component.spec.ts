import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMedicalRecordInfoComponent } from './print-medical-record-info.component';

describe('PrintMedicalRecordInfoComponent', () => {
  let component: PrintMedicalRecordInfoComponent;
  let fixture: ComponentFixture<PrintMedicalRecordInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMedicalRecordInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMedicalRecordInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
