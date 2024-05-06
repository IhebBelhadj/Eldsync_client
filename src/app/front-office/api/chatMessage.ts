// chat-message.interface.ts
export interface ChatMessage {
    id?: string;
    chatId?: string;
    senderId?: string;
    recipientId?: string;
    content?: string;
    timestamp?: Date;
}
