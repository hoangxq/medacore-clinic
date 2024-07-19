import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMedicineComponent } from './print-medicine.component';

describe('PrintMedicineComponent', () => {
  let component: PrintMedicineComponent;
  let fixture: ComponentFixture<PrintMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
