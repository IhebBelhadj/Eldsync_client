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
  displayDeleteDialog: boolean = false;
  idToDelete: number | null = null;

  displayInfoDialog: boolean = false;
  infoMessage: string = '';

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

  sortEventsByNewestFirst(): void {
    this.events.sort((a, b) => {
      const dateA = new Date(a.date); // Assuming 'date' is the field that stores event date
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Sorts in descending order
    });
  }
  
 

  getEventsByDateRange(): void {
    if (!this.fromDate || !this.toDate || this.fromDate > this.toDate) {
      this.infoMessage = "Please check the dates. Start date should not be later than end date.";
      this.displayInfoDialog = true;

      return;
    }
  
    const validFromDate = new Date(this.fromDate);
    const validToDate = new Date(this.toDate);
  
    this.eventService.getEventsByDonationDateRange(validFromDate, validToDate).subscribe({
      next: (events) => {
        const approvedEvents = events.filter(event => event.status === EventStatus.PENDING);
        if (approvedEvents.length === 0) {
          this.infoMessage = "There are no events in this range of date. Try another period.";
          this.displayInfoDialog = true;
                } else {
          this.handleEventBanners(approvedEvents);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          // Handle the 404 error
          this.infoMessage = "There are no events in this range of date. Try another period.";
          this.displayInfoDialog = true;
                } else {
          console.error('Error fetching events by date range:', error);
        }
      }
    });
  }

  closeInfoDialog(): void {
    this.displayInfoDialog = false;
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
    this.router.navigate(['/frontOffice/event']);
  }

  showDialog(event: any): void {
    this.selectedEvent = event;
    this.displayDialog = true;
  }

  GoToEventSchedular(): void {
    this.router.navigate(['/frontOffice/event/EventSchedular']);
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
  

  showDialogToDelete(idEvent: number): void {
    this.idToDelete = idEvent;
    this.displayDeleteDialog = true;
  }

  confirmDelete(): void {
    if (this.idToDelete !== null) {
      this.eventService.removeEvent(this.idToDelete).subscribe(
        () => {
          console.log('Event deleted successfully.');
          this.events = this.events.filter((event) => event.idEvent !== this.idToDelete);
          this.getEventsByStatus(); // Refresh list if needed
          this.displayDeleteDialog = false; // Close the dialog
          this.idToDelete = null; // Reset the id to delete
        },
        (error) => {
          console.error('Error removing event:', error);
          this.displayDeleteDialog = false; // Close the dialog
          this.idToDelete = null; // Reset the id to delete
        }
      );
    }
  }

  resetEvents(): void {
    this.getEventsByStatus(); 
  
}

}