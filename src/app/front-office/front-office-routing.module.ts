import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadComponent: () => import('./lifeline/lifeline.component').then(m => m.LifelineComponent) },
    // lazy load a standalone component (lifeline.component.ts)

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
