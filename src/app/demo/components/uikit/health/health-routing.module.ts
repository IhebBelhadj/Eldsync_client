import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HealthComponent } from './health.component';
import {HealthTrackComponent} from "./healthTrack/healthTrack.component";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HealthComponent , children: [
                { path: '', redirectTo: 'healthTrack', pathMatch: 'full' },
                { path: 'healthTrack', loadChildren:() => import('./healthTrack/healthTrack.module').then((m => m.HealthTrackModule)), component: HealthTrackComponent},

            ] }
    ])],
    exports: [RouterModule]
})
export class HealthRoutingModule { }
