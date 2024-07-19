import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalExaminationComponent } from './create-medical-examination.component';

describe('CreateMedicalExaminationComponent', () => {
  let component: CreateMedicalExaminationComponent;
  let fixture: ComponentFixture<CreateMedicalExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMedicalExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMedicalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
