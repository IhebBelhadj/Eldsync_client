import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject, map } from 'rxjs';
import { Event } from './event';
import { EventStatus } from './event-status';
//import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8081/api/EldSync/Event';
  private userApiUrl = 'http://localhost:8081/api/users';
  private eventNotificationSource = new Subject<Event>();


  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {}

  

  public retrieveAllEvents(): Observable<Event[]> {
    
    return this.http.get<Event[]>(`${this.apiUrl}/retrieveAllEvents`);
  }

 
  getLocationSuggestions(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/locationsSuggestions?query=${query}`);
  }
  
  
  approveEvent(eventId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}/approve`, { status: 'APPROVED' });
  }
  
  addEvent(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addEvent`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }


  /*public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/addEvent`, event);
  }  

 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
*/

getEventBanner(eventId: number): Observable<SafeUrl> {
  return this.http.get(`${this.apiUrl}/eventBanner/${eventId}`, { responseType: 'blob' }).pipe(
    map(blob => {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  

    })
  );
}


  

  public retrieveEvent(idEvent: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${idEvent}`);
  }

  public removeEvent(idEvent: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeEvent/${idEvent}`);
  }

  public suggestNewEvent(event: Event): Observable<Event> {
    event.status = EventStatus.PENDING;
    return this.http.post<Event>(this.apiUrl, event);
  }

/*  public getEventDetails(idEvent: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/details/${idEvent}`);
  }
*/
public getEventDetails(idEvent: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/getEventDetails/${idEvent}`);}

  

  public filterEventsByCategory(category: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/category/${category}`);
  }

  public registerUserForEvent(idUser: number, eventId: number): Observable<void> {
    return this.http.post<void>(`${this.userApiUrl}/events/${idUser}/${eventId}`, {});
  }
/*
  public getUserWithMostEventsAttended(): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/most-events`);
  }
*/






public getEventsByDonationDateRange(fromDate: Date, toDate: Date): Observable<Event[]> {
  // Format Date objects to 'yyyy-MM-dd' strings suitable for LocalDate
  return this.http.get<Event[]>(`${this.apiUrl}/by-donation-date`, {
    params: {
      fromDate: fromDate.toISOString().split('T')[0],
      toDate: toDate.toISOString().split('T')[0]
    }
  });
}





  public getUpcomingEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/upcoming`);
  }

  public getPastEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/pastEvent`);
  }

/*  
  updateEvent(idEvent: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/updateEvent/${idEvent}`, event);
  }
  */
  updateEvent(idEvent: number, event: Event, file?: File): Observable<Event> {
    const formData: FormData = new FormData();
    formData.append('event', new Blob([JSON.stringify(event)], {type: 'application/json'}));

    if (file) {
      formData.append('file', file);
    }

    return this.http.put<Event>(`${this.apiUrl}/updateEvent/${idEvent}`, formData);
  }

}
