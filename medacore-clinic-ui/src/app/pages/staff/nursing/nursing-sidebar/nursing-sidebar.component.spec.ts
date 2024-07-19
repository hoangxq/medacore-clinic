import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingSidebarComponent } from './nursing-sidebar.component';

describe('NursingSidebarComponent', () => {
  let component: NursingSidebarComponent;
  let fixture: ComponentFixture<NursingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursingSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
