import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordInfoComponent } from './patient-medical-record-info.component';

describe('PatientMedicalRecordInfoComponent', () => {
  let component: PatientMedicalRecordInfoComponent;
  let fixture: ComponentFixture<PatientMedicalRecordInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMedicalRecordInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalRecordInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
