import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingUpdateScheduleStatusComponent } from './nursing-update-schedule-status.component';

describe('NursingUpdateScheduleStatusComponent', () => {
  let component: NursingUpdateScheduleStatusComponent;
  let fixture: ComponentFixture<NursingUpdateScheduleStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingUpdateScheduleStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingUpdateScheduleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
