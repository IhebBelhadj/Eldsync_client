import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Users} from "../../../../../../Pdv - Copie/Eldsync_client/src/app/demo/api/users";
import {ChatRoom} from "../../../../../../Pdv - Copie/Eldsync_client/src/app/demo/api/chatRoom";
import {ChatMessage} from "../../../../../../Pdv - Copie/Eldsync_client/src/app/demo/api/chatMessage";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private baseUrl = 'http://localhost:8080/users';
    private apiUrl = 'http://localhost:8080';
    private friendConnectedSubject: Subject<void> = new Subject<void>();

    constructor(private http: HttpClient) { }

    // Method to fetch connected users
    getConnectedUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(this.baseUrl);
    }

    // Method to trigger reload when a friend is connected
    sendMessage(message: ChatMessage): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/chat`, message);
    }

    fetchMessages(senderId: string, recipientId: string): Observable<ChatMessage[]> {
        return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages/${senderId}/${recipientId}`);
    }

    createChatRoom(chatRoom: ChatRoom): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/chatroom/create`, chatRoom);
    }
    getLastMessage(senderId: string, recipientId: string): Observable<ChatMessage> {
        return this.http.get<ChatMessage>(`${this.apiUrl}/messages/last/${senderId}/${recipientId}`);
    }


}
