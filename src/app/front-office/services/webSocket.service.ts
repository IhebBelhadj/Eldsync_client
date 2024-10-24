import {EventEmitter, Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {Users} from "../api/users";
import {ChatMessage} from "../api/chatMessage";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    private stompClient: any;
    private connectedSubject: Subject<boolean> = new Subject<boolean>();
    messageReceived = new EventEmitter<any>();
    userConnected = new EventEmitter<any>();
    private connectedUsersSubject1 = new BehaviorSubject<Users[]>([]);

    public websocketConnected$ = this.connectedSubject.asObservable();

    private connectedUsersSubject: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);

    private messagesSubject: Subject<ChatMessage[]> = new Subject<ChatMessage[]>();

    constructor() {}

    connect(nickname: string, fullname: string): Observable<Users[]> {
        const socket = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
                this.stompClient.subscribe(`/user/${nickname}/queue/messages`, (payload) => {
                    this.onMessageReceived(payload);
                });
                this.stompClient.subscribe(`/user/public`, (payload) => {
                    this.onUserConnected(payload);
                });

                // register the connected user
                this.stompClient.send("/app/user.addUser",
                    {},
                    JSON.stringify({ nickName: nickname, fullName: fullname, status: 'ONLINE' })
                );
        }, (error) => {
            console.error('WebSocket connection error:', error);
            setTimeout(() => this.connect(nickname, fullname), 5000); // try to reconnect after 5 seconds
        });

        return this.connectedUsersSubject.asObservable();
    }




    fetchChatMessages(nickname: string, selectedUserId: string): Observable<ChatMessage[]> {
        const chatMessagesSubject: Subject<ChatMessage[]> = new Subject<ChatMessage[]>();

        if (this.stompClient) {
            this.stompClient.subscribe(`/messages/${nickname}/${selectedUserId}`, (message: Stomp.Message) => {
                const chatMessages: ChatMessage[] = JSON.parse(message.body);
                chatMessagesSubject.next(chatMessages);
            });
        }

        return chatMessagesSubject.asObservable();
    }

    sendMessage(chatMessage: ChatMessage): void {
        if (this.stompClient) {
            this.stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
        }
    }

    disconnect(nickname: string, fullname: string): void {
        if (this.stompClient) {
            this.stompClient.unsubscribe(`/user/${nickname}/queue/messages`);
            this.stompClient.unsubscribe('/user/public');
            this.stompClient.send('/app/user.disconnectUser', {}, JSON.stringify({ nickName: nickname, fullName: fullname, status: 'OFFLINE' }));
        }
    }

/*    private onMessageReceived(messageBody: string) {
        const users: Users[] = JSON.parse(messageBody);

        this.connectedUsersSubject.next(users);

        console.log("Connected users  :) : ", users);

    }*/
    onMessageReceived(payload: any) {
        // This method will be called when a message is received from the server
        const message = JSON.parse(payload.body);
        this.messageReceived.emit(payload);
        console.log("Message received from server : ", message);
    }

    onUserConnected(payload: any) {
        const user = JSON.parse(payload.body);
        console.log('User connected from server', user);
        this.userConnected.emit(payload);
    }


}
