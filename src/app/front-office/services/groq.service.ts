import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ChatBotMessages} from "../api/chatBotMessages";

@Injectable({
  providedIn: 'root'
})
export class GroqService {

  private baseUrl = 'http://127.0.0.1:5000/chat'; // Change this URL if your Flask server is hosted elsewhere

  constructor(private http: HttpClient) {}

  sendMessage(prompt: string): Observable<ChatBotMessages> {
    console.log('Sending message:', prompt); // Add console log to check if the message is sent
    return this.http.post<ChatBotMessages>(this.baseUrl, { prompt });
  }

}
