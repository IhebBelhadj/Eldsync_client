import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingRoutingModule } from './login-routing-routing.module';
import {LoginComponent} from "./login.component";
import {ChatService} from "../../../../service/chatService";
import {FormsModule} from "@angular/forms";
import {WebsocketService} from "../../../../service/webSocket.service";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingRoutingModule,
    FormsModule
  ],
  providers: [ChatService]
})
export class LoginRoutingModule { }
