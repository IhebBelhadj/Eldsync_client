import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    { path: 'chatSync', loadChildren: () => import('./chat-sync/chat/chat-routing.module').then(m => m.ChatRoutingModule)},
    { path: 'lifePulse', data: { breadcrumb: 'life Pulse' }, loadChildren:() => import('./lifePulse/lifePulse.module').then((m => m.LifePulseModule))},
    { path: 'lifeline', loadComponent: () => import('./lifeline/lifeline.component').then(m => m.LifelineComponent) },
    { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
    { path: 'eventUser', loadChildren: () => import('./event-user/event-user.module').then(m => m.EventUserModule) },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
