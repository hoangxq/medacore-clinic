import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHeaderControlComponent } from './patient-header-control.component';

describe('PatientHeaderControlComponent', () => {
  let component: PatientHeaderControlComponent;
  let fixture: ComponentFixture<PatientHeaderControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHeaderControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHeaderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
