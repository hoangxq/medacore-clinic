import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHeaderControlComponent } from './doctor-header-control.component';

describe('DoctorHeaderControlComponent', () => {
  let component: DoctorHeaderControlComponent;
  let fixture: ComponentFixture<DoctorHeaderControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorHeaderControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorHeaderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
