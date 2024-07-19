import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingPaymentProcessingComponent } from './nursing-payment-processing.component';

describe('NursingPaymentProcessingComponent', () => {
  let component: NursingPaymentProcessingComponent;
  let fixture: ComponentFixture<NursingPaymentProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingPaymentProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingPaymentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
