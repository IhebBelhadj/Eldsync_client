import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SharedLifePulseService} from "../../services/sharedLifePulse.service";

@Component({
  selector: 'app-rightTabs',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './rightTabs.component.html',
  styleUrl: './rightTabs.component.scss'
})
export class RightTabsComponent {
    @Output() toggleVisibility = new EventEmitter<void>();
    constructor(private sharedLifePulseService: SharedLifePulseService) {}
    toggleEditor() {
        this.sharedLifePulseService.toggleContainerVisibilityTrue();
        this.sharedLifePulseService.toggleModifyCssFalse();
    }

    handleClickNotes() {
        this.toggleEditor();
    }

    handleClickChat() {
        this.toggleEditor();
    }

    handleClickTodo() {
        this.toggleEditor();
    }
}
