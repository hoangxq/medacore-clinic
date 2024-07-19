import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateServicesComponent } from './modal-create-services.component';

describe('ModalCreateServicesComponent', () => {
  let component: ModalCreateServicesComponent;
  let fixture: ComponentFixture<ModalCreateServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
