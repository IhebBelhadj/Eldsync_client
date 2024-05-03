import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrontComponent } from './front.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FrontComponent }
    ])],
    exports: [RouterModule]
})
export class FrontRoutingModule { }
