import {Component, EventEmitter, Output, Renderer2} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SharedLifePulseService} from "../../services/sharedLifePulse.service";

@Component({
  selector: 'app-bottomTabs',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
    @Output() toggleVisibility = new EventEmitter<void>();
    @Output() measureTabClicked = new EventEmitter<void>();
    @Output() otherTabClicked = new EventEmitter<void>();    constructor(private sharedLifePulseService: SharedLifePulseService) {}
    toggleEditor() {
        this.sharedLifePulseService.toggleContainerVisibilityFalse();
        this.sharedLifePulseService.toggleModifyCssTrue();
    }

    handleClickStats() {
        this.toggleEditor();
        this.otherTabClicked.emit();
    }

    handleClickMeasure() {
        this.toggleEditor();
        this.measureTabClicked.emit();
    }

    handleClickDuo() {
        this.toggleEditor();
        this.otherTabClicked.emit();
    }
}
