import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSpecifyClsComponent } from './patient-specify-cls.component';

describe('PatientSpecifyClsComponent', () => {
  let component: PatientSpecifyClsComponent;
  let fixture: ComponentFixture<PatientSpecifyClsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSpecifyClsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSpecifyClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
