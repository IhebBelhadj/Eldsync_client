
import {ChatMessage} from "./chatMessage";


export interface Users {
    nickName: string;
    fullName: string;
    status: Status;
    lastMessage?: ChatMessage;

}

export enum Status {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
    // Add more statuses if needed
}
export interface Message {
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: Date;
}
