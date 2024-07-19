import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCreatePrescriptionComponent } from './doctor-create-prescription.component';

describe('DoctorCreatePrescriptionComponent', () => {
  let component: DoctorCreatePrescriptionComponent;
  let fixture: ComponentFixture<DoctorCreatePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCreatePrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCreatePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
