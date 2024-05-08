import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConsultationComponent } from './event-consultation.component';

describe('EventConsultationComponent', () => {
  let component: EventConsultationComponent;
  let fixture: ComponentFixture<EventConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventConsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
