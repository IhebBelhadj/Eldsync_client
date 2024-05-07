import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingRoutingModule } from './login-routing-routing.module';
import {LoginComponent} from "./login.component";
import {ChatService} from "../../services/chatService";
import {FormsModule} from "@angular/forms";


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
