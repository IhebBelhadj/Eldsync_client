import { Component} from '@angular/core';
import {GroqService} from "../../../../service/groq.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgOptimizedImage} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    InputTextModule,
    ButtonModule,
    NgClass
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  message: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  constructor(private groqService: GroqService) { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    if (this.message.trim() === '') {
      return; // Don't send empty messages
    }

    // Add user message to chat history
    this.messages.push({ text: 'You: ' + this.message, isUser: true });

    // Send message to chatbot service
    this.groqService.sendMessage(this.message)
        .subscribe(
            (data) => {
              // Add chatbot response to chat history
              this.messages.push({ text: 'Chatbot: ' + data.response, isUser: false });
            },
            (error) => {
              console.error('Error:', error);
            }
        );

    // Clear input field
    this.message = '';
  }
}
