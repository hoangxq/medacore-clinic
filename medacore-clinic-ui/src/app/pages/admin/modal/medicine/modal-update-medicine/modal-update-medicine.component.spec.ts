import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateMedicineComponent } from './modal-update-medicine.component';

describe('ModalUpdateMedicineComponent', () => {
  let component: ModalUpdateMedicineComponent;
  let fixture: ComponentFixture<ModalUpdateMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
