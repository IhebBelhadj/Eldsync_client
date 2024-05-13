import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMedicationComponent } from './calendar-medication.component';

describe('CalendarMedicationComponent', () => {
  let component: CalendarMedicationComponent;
  let fixture: ComponentFixture<CalendarMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarMedicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
