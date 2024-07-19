import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateServicesComponent } from './modal-update-services.component';

describe('ModalUpdateServicesComponent', () => {
  let component: ModalUpdateServicesComponent;
  let fixture: ComponentFixture<ModalUpdateServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
