import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsItemsComponent } from './stats-items.component';

describe('StatsItemsComponent', () => {
  let component: StatsItemsComponent;
  let fixture: ComponentFixture<StatsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
