import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { Event } from '../../event/event';
import { EventService } from '../../event/event.service';

@Component({
  selector: 'app-event-user-recommanded',
  templateUrl: './event-user-recommanded.component.html',
  styleUrl: './event-user-recommanded.component.scss'
})
export class EventUserRecommandedComponent implements OnInit {
  popularEvents: Event[] = [];
  events: Event[];
  userId: number = 3;  
  displayDialog: boolean = false;
  dialogMessage: string = '';


  constructor(private eventService: EventService,private router: Router) {}

  /*
  ngOnInit(): void {
    this.eventService.getPopularEvents().subscribe({
      next: (events) => this.popularEvents = events,
      error: (err) => console.error('Error fetching popular events:', err)
    });
  }*/

/*
  loadEvents(): void {
    this.eventService.getPopularEventsNotRegisteredByUser(this.userId, 0, 5)
      .subscribe(events => {
        this.events = events;
      }, error => {
        console.error('There was an error retrieving events', error);
      });
  }
  */
  goBack(): void {
    this.router.navigate(['/frontOffice/eventUser']);
  }


  ngOnInit(): void {
    this.loadEvents();
  }

  showDialog(message: string) {
    this.dialogMessage = message;
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }



  loadEvents(): void {
    this.eventService.getPopularEventsNotRegisteredByUser(this.userId, 0, 5)
      .subscribe(events => {
        this.handleEventBanners(events);
      }, error => {
        console.error('There was an error retrieving events', error);
      });
  }

  handleEventBanners(events: Event[]): void {
    let observables = events.map(event => 
      this.eventService.getEventBanner(event.idEvent).pipe(
        catchError(err => {
          console.log(`Error fetching banner for event ${event.idEvent}`, err);
          return of('assets/default-banner.jpg'); // Fallback banner
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
  registerToEvent(eventId: number): void {
  
    this.eventService.registerUserForEvent(this.userId, eventId).subscribe({
      next: () => { 
        this.showDialog('You have successfully registered for the event!');
        this.events = this.events.filter(event => event.idEvent !== eventId);
        if (this.events.length < 5) {
          this.loadEvents();
        }
      },
      error: err => {
        console.error('Registration failed:', err);
        this.showDialog('Failed to register for the event.');
      }
    });
  }

}