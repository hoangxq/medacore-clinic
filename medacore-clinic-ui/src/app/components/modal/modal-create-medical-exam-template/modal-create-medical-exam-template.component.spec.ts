import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateMedicalExamTemplateComponent } from './modal-create-medical-exam-template.component';

describe('ModalCreateMedicalExamTemplateComponent', () => {
  let component: ModalCreateMedicalExamTemplateComponent;
  let fixture: ComponentFixture<ModalCreateMedicalExamTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateMedicalExamTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateMedicalExamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
