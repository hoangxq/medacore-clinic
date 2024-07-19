import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingAppointmentComponent } from './nursing-appointment.component';

describe('NursingAppointmentComponent', () => {
  let component: NursingAppointmentComponent;
  let fixture: ComponentFixture<NursingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
