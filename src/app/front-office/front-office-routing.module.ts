import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'chatSync', loadChildren: () => import('./chat-sync/chat/chat-routing.module').then(m => m.ChatRoutingModule)},
  { path: 'lifePulse', data: { breadcrumb: 'life Pulse' }, loadChildren:() => import('./lifePulse/lifePulse.module').then((m => m.LifePulseModule))},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
