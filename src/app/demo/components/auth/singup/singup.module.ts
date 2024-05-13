import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingupRoutingModule } from './singup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SingupComponent } from './singup.component';


@NgModule({
  imports: [
    CommonModule,
    SingupRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [SingupComponent]

})
export class SingupModule { }
