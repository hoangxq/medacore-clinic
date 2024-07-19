import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSpecifyClsComponent } from './doctor-specify-cls.component';

describe('DoctorSpecifyClsComponent', () => {
  let component: DoctorSpecifyClsComponent;
  let fixture: ComponentFixture<DoctorSpecifyClsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSpecifyClsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSpecifyClsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
