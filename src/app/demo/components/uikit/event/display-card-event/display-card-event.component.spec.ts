import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCardEventComponent } from './display-card-event.component';

describe('DisplayCardEventComponent', () => {
  let component: DisplayCardEventComponent;
  let fixture: ComponentFixture<DisplayCardEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCardEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayCardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
