import { Component, OnInit } from '@angular/core';
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
  userId: number = 2;  

  constructor(private eventService: EventService) {}

  /*
  ngOnInit(): void {
    this.eventService.getPopularEvents().subscribe({
      next: (events) => this.popularEvents = events,
      error: (err) => console.error('Error fetching popular events:', err)
    });
  }*/


  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getPopularEventsNotRegisteredByUser(this.userId, 0, 5)
      .subscribe(events => {
        this.events = events;
      }, error => {
        console.error('There was an error retrieving events', error);
      });
  }

  
  registerToEvent(eventId: number): void {
  
    this.eventService.registerUserForEvent(this.userId, eventId).subscribe({
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

}