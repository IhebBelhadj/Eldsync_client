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

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadUserEvents(); // Assume 'user123' is the current user's ID
  }
  loadUserEvents(): void {
    const userId = 2; // Get this dynamically as needed
    this.eventService.getEventsForUser(userId).subscribe({
      next: (events) => this.handleEventBanners(events),
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

