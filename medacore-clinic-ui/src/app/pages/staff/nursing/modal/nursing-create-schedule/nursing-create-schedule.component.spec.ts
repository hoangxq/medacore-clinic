import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingCreateScheduleComponent } from './nursing-create-schedule.component';

describe('NursingCreateScheduleComponent', () => {
  let component: NursingCreateScheduleComponent;
  let fixture: ComponentFixture<NursingCreateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingCreateScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingCreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
