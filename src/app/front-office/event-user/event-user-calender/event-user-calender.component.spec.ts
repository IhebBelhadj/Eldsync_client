import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserCalenderComponent } from './event-user-calender.component';

describe('EventUserCalenderComponent', () => {
  let component: EventUserCalenderComponent;
  let fixture: ComponentFixture<EventUserCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUserCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventUserCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
