import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingPaymentInvoicePrintingComponent } from './nursing-payment-invoice-printing.component';

describe('NursingPaymentInvoicePrintingComponent', () => {
  let component: NursingPaymentInvoicePrintingComponent;
  let fixture: ComponentFixture<NursingPaymentInvoicePrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingPaymentInvoicePrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingPaymentInvoicePrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
