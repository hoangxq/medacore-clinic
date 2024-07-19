import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nursing-payment-invoice-printing',
  templateUrl: './nursing-payment-invoice-printing.component.html',
  styleUrls: ['./nursing-payment-invoice-printing.component.scss']
})
export class NursingPaymentInvoicePrintingComponent implements OnInit {
  ngOnInit(): void {
    window.print();
  }

}
