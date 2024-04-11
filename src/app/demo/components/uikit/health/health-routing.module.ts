import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HealthComponent } from './health.component';
import {HealthTrackComponent} from "./healthTrack/healthTrack.component";
import {NotesComponent} from "./notes/notes.component";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HealthComponent , children: [
                { path: '', redirectTo: 'healthTrack', pathMatch: 'full' },
                { path: 'healthTrack', loadChildren:() => import('./healthTrack/healthTrack.module').then((m => m.HealthTrackModule)), component: HealthTrackComponent},
                { path: 'notes',loadChildren:() => import('./notes/notes.module').then(m => m.NotesModule),component: NotesComponent}

            ] }
    ])],
    exports: [RouterModule]
})
export class HealthRoutingModule { }
