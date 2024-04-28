import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'lifeline', loadComponent: () => import('./lifeline/lifeline.component').then(m => m.LifelineComponent) },
    { path: 'event', loadComponent: () => import('./event/event.module').then(m => m.EventModule) },
    { path: 'eventUser', loadComponent: () => import('./event-user/event-user.module').then(m => m.EventUserModule) },


    // lazy load a standalone component (lifeline.component.ts)b 

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
