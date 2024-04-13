import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
    selector: 'lifeline-filter-panel',
    standalone: true,
    imports: [OverlayPanelModule, CommonModule, FormsModule, ButtonModule, SplitButtonModule, FontAwesomeModule],
    templateUrl: './filter-panel.component.html',
    styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent implements OnInit, OnDestroy {
    @Input() appendToSelector: string | null = null;
    @Input() event: Event | null = null;

    @ViewChild('op') overlayPanel!: OverlayPanel;

    filterPanelSubscription!: Subscription;
    filterOptions: MenuItem[] = [
        { label: 'Emotion', icon: 'fa-regular fa-face-smile' },
        { label: 'Intensity', icon: "fa-solid fa-chevron-up" },
        { label: 'Peers', icon: 'pi pi-fw pi-users' },
    ];

    constructor(public lifelineStateService: LifelineStateService) { }

    updateState(newState: any) {
        console.log("Update state of fast travel", newState);
        // this.lifelineStateService.setFastTravel(newState);
    }

    ngOnInit() {
        this.filterPanelSubscription = this.lifelineStateService.filtersPanelOpen$.subscribe((isOpen: boolean) => {
            if (this.overlayPanel) {
                if (isOpen) {
                    this.overlayPanel.show(this.event, this.appendToSelector); // Show the overlay panel
                } else {
                    this.overlayPanel.hide(); // Hide the overlay panel
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.filterPanelSubscription) {
            this.filterPanelSubscription.unsubscribe();
        }
    }

    onPanelShow() {
        this.lifelineStateService.setFiltersPanel(true); // Set fastTravelOpen to true when panel is shown
    }

    onPanelHide() {
        this.lifelineStateService.setFiltersPanel(false); // Set fastTravelOpen to false when panel is hidden
    }

}
