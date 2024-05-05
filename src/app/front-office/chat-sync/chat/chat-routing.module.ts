import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingRoutingModule } from './chat-routing-routing.module';
import {ChatComponent} from "./chat.component";
import {ChatService} from "../../../../service/chatService";
import {FormsModule} from "@angular/forms";
import {DividerModule} from "primeng/divider";
import {OrderListModule} from "primeng/orderlist";
import {CdkTableModule} from "@angular/cdk/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DataViewModule} from "primeng/dataview";
import {WebsocketService} from "../../../../service/webSocket.service";


@NgModule({
  declarations: [ChatComponent],
    imports: [
        CommonModule,
        ChatRoutingRoutingModule,
        FormsModule,
        DividerModule,
        OrderListModule,
        CdkTableModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DataViewModule
    ],
  providers: [ChatService]
})
export class ChatRoutingModule { }
