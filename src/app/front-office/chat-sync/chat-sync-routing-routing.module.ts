import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";

@NgModule({
  imports: [RouterModule.forChild([
    {path : 'login', component: LoginComponent},
/*    { path: 'Login',loadChildren: () => import('./login/login-routing.module').then(m => m.LoginRoutingModule) },
    { path: 'ChatRoom',loadChildren: () => import('./chat/chat-routing.module').then(m => m.ChatRoutingModule) },
    { path: '**', redirectTo: '/notfound' }*/
  ])],

  exports: [RouterModule]
})
export class ChatSyncRoutingRoutingModule { }
