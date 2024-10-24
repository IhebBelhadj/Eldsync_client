import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserAttendenceComponent } from './event-user-attendence.component';

describe('EventUserAttendenceComponent', () => {
  let component: EventUserAttendenceComponent;
  let fixture: ComponentFixture<EventUserAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUserAttendenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventUserAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
