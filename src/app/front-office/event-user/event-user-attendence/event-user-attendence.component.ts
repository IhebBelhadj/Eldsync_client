import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { Event } from '../../event/event';
import { EventService } from '../../event/event.service';

@Component({
  selector: 'app-event-user-attendence',
  templateUrl: './event-user-attendence.component.html',
  styleUrl: './event-user-attendence.component.scss'
})
export class EventUserAttendenceComponent  implements OnInit {
  events: Event[] = [];
  selectedEvent: any = null;
  displayDetailsDialog: boolean = false;
  nextEvent: Event ;


  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadUserEvents(); // Assume 'user123' is the current user's ID
  }


  setNextEvent(events: Event[]): void {
    const currentDateTime = new Date();
    // Filter for future events and sort by date
    const futureEvents = events.filter(event => new Date(event.date) > currentDateTime);
    futureEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.nextEvent = futureEvents.length > 0 ? futureEvents[0] : null;
    if (this.nextEvent) {
      console.log('Next event:', this.nextEvent);
    }
  }
  

  sortEventsByNewestFirst(): void {
    this.events.sort((a, b) => {
      const dateA = new Date(a.date); // Assuming 'date' is the field that stores event date
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Sorts in descending order
    });
  }
  


  loadUserEvents(): void {
    const userId = 3; // This should ideally be fetched dynamically based on the logged-in user.
    this.eventService.getEventsForUser(userId).subscribe({
      next: (events) => {
        this.handleEventBanners(events);
        this.setNextEvent(events);
      },
      error: (err) => console.error('Failed to load events', err)
    });
  }

  handleEventBanners(approvedEvents: any[]): void {
    let observables = approvedEvents.map(event =>
      this.eventService.getEventBanner(event.idEvent).pipe(
        catchError(err => {
          console.log(`Error fetching banner for event ${event.idEvent}`, err);
          return of('assets/default-banner.jpg'); // Default image if error
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

  selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.displayDetailsDialog = true;
  }

  GoBack(): void 
  {
    this.router.navigate(['/frontOffice/eventUser']);
  }

}

