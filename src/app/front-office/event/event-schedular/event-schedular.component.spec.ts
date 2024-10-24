import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSchedularComponent } from './event-schedular.component';

describe('EventSchedularComponent', () => {
  let component: EventSchedularComponent;
  let fixture: ComponentFixture<EventSchedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSchedularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
