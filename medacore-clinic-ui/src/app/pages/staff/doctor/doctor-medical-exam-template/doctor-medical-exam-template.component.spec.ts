import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalExamTemplateComponent } from './doctor-medical-exam-template.component';

describe('DoctorMedicalExamTemplateComponent', () => {
  let component: DoctorMedicalExamTemplateComponent;
  let fixture: ComponentFixture<DoctorMedicalExamTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMedicalExamTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalExamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
