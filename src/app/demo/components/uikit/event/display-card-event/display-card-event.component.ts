import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { EventStatus } from '../event-status';
import { EventService } from '../event.service';
@Component({
  selector: 'app-display-card-event',
  templateUrl: './display-card-event.component.html',
  styleUrl: './display-card-event.component.scss'
})
export class DisplayCardEventComponent implements OnInit {
  events: any[] = [];
  selectedEvent: any = null;
  displayDialog: boolean = false;
  fromDate: Date = new Date();  // Optionally initialize to today's date
  toDate: Date = new Date();    // Optionally initialize to today's date

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getEventsByStatus(); // Optionally call to load all events initially or wait for user input
  }

  getEventsByStatus(): void { // Renamed method for clarity
    this.eventService.retrieveAllEvents().subscribe(events => {
      console.log("Fetched events:", events);

      const approvedEvents = events.filter(event => event.status === EventStatus.PENDING);
      console.log("Filtered approved events:", approvedEvents);
      this.handleEventBanners(approvedEvents);
    });
  }

  getEventsByDateRange(): void {
    if (!this.fromDate || !this.toDate || this.fromDate > this.toDate) {
      alert("Please check the dates. Start date should not be later than end date.");
      return;
    }

    const validFromDate = new Date(this.fromDate); // Ensure this is a Date object
    const validToDate = new Date(this.toDate);     // Ensure this is a Date object

    this.eventService.getEventsByDonationDateRange(validFromDate, validToDate).subscribe(events => {
      const approvedEvents = events.filter(event => event.status === EventStatus.PENDING);
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

  GoBack(): void {
    this.router.navigate(['/uikit/event']);
  }

  showDialog(event: any): void {
    this.selectedEvent = event;
    this.displayDialog = true;
  }

  GoToEventSchedular(): void {
    this.router.navigate(['/uikit/event/EventSchedular']);
  }


  approveEvent(event: any): void {
    event.status = EventStatus.APPROVED; // Update status locally
  
    this.eventService.approveEvent(event.idEvent).subscribe({
      next: (response) => {
        console.log('Event approved successfully', response);
        // Optionally refresh the list or handle UI updates
        this.getEventsByStatus(); // Refresh list if needed
      },
      error: (error) => {
        console.error('Failed to approve event', error);
        event.status = EventStatus.PENDING; // Revert status on error
      }
    });
  }
  
}