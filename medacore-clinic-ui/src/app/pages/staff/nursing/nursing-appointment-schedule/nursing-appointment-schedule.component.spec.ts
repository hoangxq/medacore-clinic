import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingAppointmentScheduleComponent } from './nursing-appointment-schedule.component';

describe('NursingAppointmentScheduleComponent', () => {
  let component: NursingAppointmentScheduleComponent;
  let fixture: ComponentFixture<NursingAppointmentScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingAppointmentScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingAppointmentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
