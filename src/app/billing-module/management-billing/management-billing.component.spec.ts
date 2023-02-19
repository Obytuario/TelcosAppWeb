import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementBillingComponent } from './management-billing.component';

describe('ManagementBillingComponent', () => {
  let component: ManagementBillingComponent;
  let fixture: ComponentFixture<ManagementBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
