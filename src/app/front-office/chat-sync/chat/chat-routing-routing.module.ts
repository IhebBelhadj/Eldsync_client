import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./chat.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path:'', component: ChatComponent },
  ]) ],
  exports: [RouterModule]
})
export class ChatRoutingRoutingModule { }
