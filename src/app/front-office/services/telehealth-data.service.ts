import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {catchError, Observable, Subject, throwError} from 'rxjs';
import { VideoMessage } from '../api/video-message';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {VideoRoom} from "../api/VideoRoom";

export const WS_URL = 'ws://localhost:8087';

@Injectable({
  providedIn: 'root'
})
export class TelehealthDataService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<VideoMessage>();
  public messages$ = this.messagesSubject.asObservable();
  inviteCode: string;
  private apiUrl = 'http://localhost:8081/api/v1/videoRooms';
  constructor(private http: HttpClient) { }
  setInviteCode(inviteCode: string): void {
    this.inviteCode = inviteCode;
  }

  getInviteCode(): string {
    return this.inviteCode;
  }
  getAllVideoRooms(): Observable<VideoRoom[]> { // Update return type to use VideoRoom interface
    return this.http.get<VideoRoom[]>(this.apiUrl)
        .pipe(
            catchError(this.handleError)
        );
  }

  getVideoRoomById(id: number): Observable<VideoRoom> { // Update return type to use VideoRoom interface
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<VideoRoom>(url)
        .pipe(
            catchError(this.handleError)
        );
  }
  deleteVideoRoomByInviteCode(inviteCode: string): Observable<VideoRoom> {
    return this.http.delete<any>(`${this.apiUrl}/${inviteCode}`);
  }
  createVideoRoom(videoRoom: VideoRoom): Observable<VideoRoom> { // Update parameter and return type to use VideoRoom interface
    return this.http.post<VideoRoom>(this.apiUrl, videoRoom)
        .pipe(
            catchError(this.handleError)
        );
  }

  updateVideoRoom(id: number, videoRoom: VideoRoom): Observable<VideoRoom> { // Update parameter and return type to use VideoRoom interface
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<VideoRoom>(url, videoRoom)
        .pipe(
            catchError(this.handleError)
        );
  }

  deleteVideoRoom(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
        .pipe(
            catchError(this.handleError)
        );
  }

  getVideoRoomByInviteCode(inviteCode: string): Observable<VideoRoom> { // Update return type to use VideoRoom interface
    const url = `${this.apiUrl}/inviteCode/${inviteCode}`;
    return this.http.get<VideoRoom>(url)
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Resource not found:', error.error.message);
    } else {
      console.error('An error occurred:', error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  }



  public connect(): void {

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();

      this.socket$.subscribe(
          // Called whenever there is a message from the server
          msg => {
            console.log('Received message of type: ' + msg.type);
            this.messagesSubject.next(msg);
          }
      );
    }
  }

  sendMessage(msg: VideoMessage): void {
    console.log('sending message: ' + msg.type);
    this.socket$.next(msg);
  }


  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: WS_URL,
      binaryType: 'arraybuffer',
      deserializer:({data})=>{
        const UTF8= new TextDecoder('utf-8');
        const msg = JSON.parse(UTF8.decode(data));
        return msg;
      },
      openObserver: {
        next: () => {
          console.log('[DataService]: connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          this.connect();
        }
      }
    });
  }
}
