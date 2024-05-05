import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserRecommandedComponent } from './event-user-recommanded.component';

describe('EventUserRecommandedComponent', () => {
  let component: EventUserRecommandedComponent;
  let fixture: ComponentFixture<EventUserRecommandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUserRecommandedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventUserRecommandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
