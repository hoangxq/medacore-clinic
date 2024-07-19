import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateMedicalExamTemplateComponent } from './modal-update-medical-exam-template.component';

describe('ModalUpdateMedicalExamTemplateComponent', () => {
  let component: ModalUpdateMedicalExamTemplateComponent;
  let fixture: ComponentFixture<ModalUpdateMedicalExamTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateMedicalExamTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateMedicalExamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
