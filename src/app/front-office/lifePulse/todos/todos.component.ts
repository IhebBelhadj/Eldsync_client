import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {SharedLifePulseService} from "../../services/sharedLifePulse.service";

@Component({
  selector: 'app-todos',
  standalone: true,
    imports: [
        ButtonModule,
        EditorModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule
    ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{
    text: string;
    editorVisible: boolean = false;
    @Output() toggleVisibility = new EventEmitter<void>();
    constructor(private sharedLifePulseService: SharedLifePulseService) {}
    ngOnInit() {
        this.text = 'write your todos here...';
    }

    toggleEditor() {
        this.editorVisible = !this.editorVisible;
        this.sharedLifePulseService.toggleContainerVisibility();
        this.sharedLifePulseService.toggleModifyCss();
    }
    exit(){
        this.editorVisible = !this.editorVisible;
        this.sharedLifePulseService.toggleContainerVisibility();
        this.sharedLifePulseService.toggleModifyCss();
    }
}
