import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Event } from './event';
import { EventService } from './event.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'


})
export class EventComponent {

  events: Event[] = [];
  searchLocation: string = '';
  filteredEvents: Event[] = [];
  eventBannerUrl: Observable<SafeUrl>;
  selectedEvent: Event | null = null;
  displayDialog: boolean = false; 

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();


  }
  getEventBanner(eventId: number): void {
    this.eventBannerUrl = this.eventService.getEventBanner(eventId);
  }



  

  getEvents(): void {
    this.eventService.retrieveAllEvents().subscribe(events => {
      let observables = events.map(event => 
        this.eventService.getEventBanner(event.idEvent).pipe(
          catchError(err => {
            console.log(`Error fetching banner for event ${event.idEvent}`, err);
            return of('assets/default-banner.jpg'); // Provide a default or error image path
          })
        ).pipe(
          map(bannerUrl => {
            event.bannerUrl = bannerUrl;
            return event;
          })
        )
      );
  
      forkJoin(observables).subscribe(completedEvents => {
        this.events = completedEvents;
        this.filterEvents();
      });
    });
  }

  viewEvent(eventId: number): void {
    this.selectedEvent = this.events.find(event => event.idEvent === eventId);
    this.displayDialog = true;  // Open the dialog
  }


  filterEvents(): void {
    console.log('Search Location:', this.searchLocation);
    if (this.searchLocation.trim() === '') {
      this.filteredEvents = this.events;  
    } else {
      this.filteredEvents = this.events.filter(event => event.location.includes(this.searchLocation));
    }
    console.log('Filtered Events:', this.filteredEvents);
  }
  

  deleteEvent(idEvent: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.removeEvent(idEvent).subscribe(
        () => {
          console.log('Event deleted successfully.');
          this.events = this.events.filter((event) => event.idEvent !== idEvent);
          this.filterEvents(); 
        },
        (error) => {
          console.error('Error removing event:', error);
        }
      );
    }
  }


  GoEvent(): void {
    this.router.navigate(['/uikit/event/eventAddUpdate']);
  }

  
  GoToEventSchedular(): void {
    this.router.navigate(['/uikit/event/EventSchedular']);
  }

  

  GoToCard(): void {
    this.router.navigate(['/uikit/event/DisplayCardEvent']);
  }
  updateEvent(idEvent: number) {
    this.router.navigate(['/uikit/event/UpdateEvent', idEvent]);
  }

  GoToPastEvent(): void {
    this.router.navigate(['/uikit/event/PastEvent']);
  }
}

