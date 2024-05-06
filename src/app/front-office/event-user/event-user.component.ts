import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { EventStatus } from '../event/event-status';
import { EventService } from '../event/event.service';

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrl: './event-user.component.scss'
})
export class EventUserComponent implements OnInit {

  events: any[] = [];
  selectedEvent: any = null;

  totalRecords: number = 0;
  rows: number = 6;  // Default number of rows per page
  page: number = 0;  // Default initial page
  displayDialog: boolean = false;
  fromDate: Date = new Date();  // Optionally initialize to today's date
  toDate: Date = new Date();    // Optionally initialize to today's date

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getEventsByStatus(); // Optionally call to load all events initially or wait for user input
  }

  paginate(event: any): void {
    this.page = event.page;
    this.rows = event.rows;
    this.getEventsByStatus();  // Refetch or rearrange the events list according to new pagination
  }

  

  getEventsByStatus(): void { // Renamed method for clarity
    this.eventService.retrieveAllEvents().subscribe(events => {
      console.log("Fetched events:", events);

      const approvedEvents = events.filter(event => event.status === EventStatus.APPROVED);
      console.log("Filtered approved events:", approvedEvents);
      this.totalRecords = approvedEvents.length;  // Update total records for pagination
      this.handleEventBanners(approvedEvents.slice(this.page * this.rows, (this.page + 1) * this.rows));
       });
  }

  getEventsByDateRange(): void {
    if (!this.fromDate || !this.toDate || this.fromDate > this.toDate) {
      alert("Please check the dates. Start date should not be later than end date.");
      return;
    }

    const validFromDate = new Date(this.fromDate);
    const validToDate = new Date(this.toDate);

    this.eventService.getEventsByDonationDateRange(validFromDate, validToDate).subscribe(events => {
      const approvedEvents = events.filter(event => event.status === EventStatus.APPROVED);
      this.handleEventBanners(approvedEvents);
    }, error => {
      console.error('Error fetching events by date range:', error);
    });
  }



  
  handleEventBanners(approvedEvents: any[]): void {
    let observables = approvedEvents.map(event => 
      this.eventService.getEventBanner(event.idEvent).pipe(
        catchError(err => {
          console.log(`Error fetching banner for event ${event.idEvent}`, err);
          return of('assets/default-banner.jpg');
        }),
        map(bannerUrl => {
          event.bannerUrl = bannerUrl;
          return event;
        })
      )
    );

    forkJoin(observables).subscribe(completedEvents => {
      this.events = completedEvents;
    });
  }

  GoAdd(): void {
    this.router.navigate(['/frontOffice/eventUser/eventUserAdd']);
  }

  showDialog(event: any): void {
    this.selectedEvent = event;
    this.displayDialog = true;
  }




  registerToEvent(eventId: number): void {
    const userId = 2; 
  
    this.eventService.registerUserForEvent(userId, eventId).subscribe({
      next: () => { 
        console.log('Registered successfully');
        alert('You have successfully registered for the event!');
      },
      error: err => {
        console.error('Registration failed:', err);
        alert('Failed to register for the event.');
      }
    });
  }
  

navigateToAttendedEvents(): void {
  this.router.navigate(['/frontOffice/eventUser/eventAttended']); // Adjust the path as needed
}

















  GoCalender(): void {
    this.router.navigate(['/frontOffice/eventUser/eventUserCalender']);
  }


}