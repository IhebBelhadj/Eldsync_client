// chat-room.interface.ts
import {ChatMessage} from "../../../../../../finalEldSync/Eldsync_client/src/app/front-office/api/chatMessage";

export interface ChatRoom {
    id: string;
    chatId: string;
    senderId: string;
    recipientId: string;

}
