import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserAddComponent } from './event-user-add.component';

describe('EventUserAddComponent', () => {
  let component: EventUserAddComponent;
  let fixture: ComponentFixture<EventUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUserAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
