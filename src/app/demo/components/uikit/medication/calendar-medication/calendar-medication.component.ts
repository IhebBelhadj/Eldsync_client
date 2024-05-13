import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import { ConsumerMedicationService } from '../services/consumer-medication.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Medication } from '../model/medication';

@Component({
  selector: 'app-calendar-medication',
  templateUrl: './calendar-medication.component.html',
  styleUrl: './calendar-medication.component.scss'
})
export class CalendarMedicationComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    editable: false,
    eventClick: (arg) => this.handleDateClick(arg),
    events: [] // Initial empty array for events
  };
  medicationList: Medication[] = []; // Initialize medicationList array
  displayMedicationDetails: boolean = false;
  selectedMedicationDetails: Medication;

  constructor(private consMedService: ConsumerMedicationService) { }

  ngOnInit(): void {
    this.loadMedicationReminders();
  }

  loadMedicationReminders(): void {
    this.consMedService.getMedications().subscribe({
      next: (medications) => { 
        this.medicationList = medications; // Assign medications directly to medicationList
        // Format medication reminders into events array
        const events = medications.map(medication => {
          return {
            title: medication.name, // Use medication name as event title
            start: medication.startDate, // Use medication start date as event start
            end: medication.endDate // Use medication end date as event end
          };
        });
        this.calendarOptions.events = events;
      },
      error: (error) => {
        console.error('Error loading medication reminders:', error);
      }
    });
  }
  
  handleDateClick(event): void {
    // Extract the selected date from the event
    const selectedDate = event.date;

    // Find the medication corresponding to the selected date
    this.selectedMedicationDetails = this.medicationList.find(medication => medication.dosageTime === selectedDate);

    // Open the medication details dialog
    this.displayMedicationDetails = true;
  }

  closeMedicationDetailsDialog(): void {
    // Close the medication details dialog
    this.displayMedicationDetails = false;
  }

}
