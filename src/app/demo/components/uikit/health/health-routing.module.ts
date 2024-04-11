import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HealthComponent } from './health.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: HealthComponent , children: [
                { path: '', redirectTo: 'healthTrack', pathMatch: 'full' },
            ] }
    ])],
    exports: [RouterModule]
})
export class HealthRoutingModule { }
