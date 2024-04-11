import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HealthTrackComponent } from './healthTrack.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'healthTrack', component: HealthTrackComponent  }
    ])],
    exports: [RouterModule]
})
export class HealthTrackRoutingModule { }
