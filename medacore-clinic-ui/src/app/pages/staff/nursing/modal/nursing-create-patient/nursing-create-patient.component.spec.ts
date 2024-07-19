import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingCreatePatientComponent } from './nursing-create-patient.component';

describe('NursingCreatePatientComponent', () => {
  let component: NursingCreatePatientComponent;
  let fixture: ComponentFixture<NursingCreatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingCreatePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingCreatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
