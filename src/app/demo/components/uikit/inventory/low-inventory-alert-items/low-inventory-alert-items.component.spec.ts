import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowInventoryAlertItemsComponent } from './low-inventory-alert-items.component';

describe('LowInventoryAlertItemsComponent', () => {
  let component: LowInventoryAlertItemsComponent;
  let fixture: ComponentFixture<LowInventoryAlertItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowInventoryAlertItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowInventoryAlertItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
