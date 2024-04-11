import { NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NotesComponent} from "./notes.component";
import {NotesRoutingModule} from "./notes-routing.module";
import {EditorModule} from 'primeng/editor';
import {FormsModule} from "@angular/forms";
import {AccordionModule} from "primeng/accordion";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MenuModule} from "primeng/menu";
@NgModule({
    imports: [
        CommonModule,
        NotesRoutingModule,
        EditorModule,
        FormsModule,
        AccordionModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        MenuModule
    ],
    declarations: [NotesComponent]
})
export class NotesModule{

}
