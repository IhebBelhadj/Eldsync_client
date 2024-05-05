import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {interval, Subject, Subscription, switchMap, takeUntil} from 'rxjs';
import {WebsocketService} from '../../services/webSocket.service';
import {ChatService} from '../../services/chatService';
import {UserService} from '../../services/login.service';
import {Status, Users} from '../../api/users';
import {ChatMessage} from "../../api/chatMessage";
import {ChatRoom} from "../../api/chatRoom";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'] })
export class ChatComponent implements OnInit, OnDestroy {
    userNickname: string;
    userFullname: string;

    newUsers: Users[] = [];
    connectedUsers: Users[] = [];
    lastMessage: ChatMessage;
    nickname: string; fullname: string;
    chatRooms: ChatRoom[] = [];
    chatMessages: ChatMessage[] = [];
    messageInput: string;
    fetchSubscription: Subscription;
    selectedUserId: string = '';
    private destroy$: Subject<void>  = new Subject ();
    selectedUser: string;
    @ViewChild('chatArea') chatArea: ElementRef;
    constructor(private websocketService: WebsocketService, private chatService: ChatService, private userService: UserService) { }
    ngOnInit() {
        this.userNickname =this.getUsername();

        this.loadConnectedUsers();


       /* this.fetchSubscription = interval(1000).subscribe(() => {
            this.fetchMessages(this.selectedUserId);
        });*/
        // Subscribe to updates about connected users
       /* this.websocketService.websocketConnected$.subscribe(connected => {
            if (connected) {
                this.websocketService.updateConnectedUsers(this.connectedUsers);
            }
        });*/


        // Continuously load connected users every 1 second
        /*interval(1000)
            .pipe(
                takeUntil(this.destroy$),
                switchMap(() => this.chatService.getConnectedUsers())
            )
            .subscribe(users => {
                this.updateConnectedUsers(users);
            });*/
        this.websocketService.userConnected.subscribe((payload) => {
            // Call the onUserConnected method when the event is triggered
            this.onUserConnected(payload);
        });
        this.websocketService.messageReceived.subscribe((payload) => {
            // Call the onMessageReceived method when the event is triggered
            this.onMessageReceived(payload);
        });
    }

    ngOnDestroy() {
        // Unsubscribe from the interval to prevent memory leaks
        this.websocketService.disconnect(this.getUsername(),this.getFullname());
    }

    getUsername(): string {
        return this.userService.userData.nickname;
    }
    getFullname(): string {
        return this.userService.userData.fullname;
    }


    loadConnectedUsers() {
        this.userNickname = this.getUsername();
        this.userFullname = this.getFullname();

        if (this.userNickname && this.userFullname) {
            console.log('Current user:', this.userNickname, this.userFullname);
            this.connectedUsers.push({ nickName: this.userNickname, fullName: this.userFullname, status: Status.ONLINE }); // Add current user initially

            // Fetch connected users and their IDs
            this.chatService.getConnectedUsers().subscribe(users => {
                this.updateConnectedUsers(users);

                // Iterate over connected users to fetch last messages
                users.forEach(user => {
                    const senderId = this.getUsername();
                    const recipientId = user.nickName;

                    this.chatService.getLastMessage(senderId, recipientId).subscribe(
                        (message: ChatMessage) => {
                            // Associate the message with the corresponding chat room
                            user.lastMessage = message;

                            console.log(`Last message from ${user.nickName}:`, message);
                            console.log('nyahahah',message.content); // Using optional chaining
                            console.log('nyahahah',message.timestamp); // Using optional chaining
                            console.log(user.lastMessage);
                        },
                        (error) => {
                            console.error(`Error fetching last message from ${user.nickName}:`, error);
                        }
                    );
                });
            });
        } else {
            console.error('Nickname or fullname input elements not found.');
        }
    }

    updateConnectedUsers(users: Users[]) {
        this.connectedUsers = users.filter(user =>
            user.nickName !== this.userNickname || user.fullName !== this.userFullname
        );
        if (!this.selectedUserId && this.connectedUsers.length > 0) {
            this.onUserFriendClick(this.connectedUsers[0].nickName);
        }

    }

    onUserFriendClick(userId: string): void {

        this.selectedUserId = userId; // Set selected user ID
        this.fetchMessages(this.selectedUserId); // Fetch chat messages for the selected user


    }
    onUserConnected(payload: any) {
        const user = JSON.parse(payload.body);
        if(!payload) {
            console.error('Payload is not available.', payload);
            return;
        }
        else if (user.nickName !== this.getUsername()) {
            const userConnected : Users = {
                nickName: user.nickName,
                fullName: user.fullName,
                status: user.status
            };

            this.connectedUsers.push(userConnected);
        }

    }
    onMessageReceived(payload: any) {
        const message = JSON.parse(payload.body);

        if(!payload) {
            console.error('Payload is not available.', payload);
            return;
        }
        else {
            const chatMessage: ChatMessage = {
                content: message.content,
                recipientId: message.recipientId,
                senderId: message.senderId,
                timestamp: message.timestamp
            };
            this.chatMessages.push(chatMessage);
            this.scrollToBottom();
        }
    }


    fetchMessages(recipientId: string): void {
        // Assuming you have the senderId from somewhere
        const senderId = this.getUsername(); // Replace 'currentUserId' with the actual senderId

        this.chatService.fetchMessages(senderId, recipientId)
            .subscribe(messages => {
                this.chatMessages = messages;
            });

    }






    sendMessage(event: Event): void {
        this.messageInput = (document.querySelector('#message') as HTMLInputElement).value.trim();
        if (!this.messageInput || !this.selectedUserId) {
            console.error('Message input or selected user is not available.', this.messageInput, this.selectedUserId);
            return;
        }

        const messageContent = this.messageInput;
        if (messageContent) {
            const chatMessage = {
                senderId: this.getUsername(),
                recipientId: this.selectedUserId,
                content: messageContent,
                timestamp: new Date()
            };

            this.websocketService.sendMessage(chatMessage);
            this.messageInput = '';
            this.chatMessages.push(chatMessage);

            console.log('Sent message:', chatMessage); // Add this line to log the sent message

            // Add debug statements to check the values of `nickname` and `message.senderId`
            console.log('Current user nickname:', this.getUsername());
            console.log('Is sender current user?', chatMessage.senderId === this.nickname);
        }
        setTimeout(() => {
            this.scrollToBottom();
        });
        event.preventDefault(); // Ensure the form submission is prevented
    }

    scrollToBottom(): void {
        try {
            // Scroll to the bottom of the chat area
            this.chatArea.nativeElement.scrollTop = this.chatArea.nativeElement.scrollHeight;
        } catch(err) {
            console.error("Error scrolling to bottom:", err);
        }
    }


    onLogout(): void {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('nickname');
        localStorage.removeItem('fullname');
        // Disconnect WebSocket and reload page logic
        this.websocketService.disconnect(this.getUsername(), this.getFullname());


    }
    startVideoCall(): void {
        // Implement video call logic
    }

    startVoiceCall(): void {
        // Implement voice call logic
    }

    toggleAbout(): void {

    }
}
