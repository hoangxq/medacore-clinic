import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedicalExamTemplateComponent } from './admin-medical-exam-template.component';

describe('AdminMedicalExamTemplateComponent', () => {
  let component: AdminMedicalExamTemplateComponent;
  let fixture: ComponentFixture<AdminMedicalExamTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMedicalExamTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMedicalExamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
