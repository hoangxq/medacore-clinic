import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateMedicineComponent } from './modal-create-medicine.component';

describe('ModalCreateMedicineComponent', () => {
  let component: ModalCreateMedicineComponent;
  let fixture: ComponentFixture<ModalCreateMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
