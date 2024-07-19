import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPaymentModalComponent } from './print-payment-modal.component';

describe('PrintPaymentModalComponent', () => {
  let component: PrintPaymentModalComponent;
  let fixture: ComponentFixture<PrintPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPaymentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
