import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'lifeline-fast-travel',
    standalone: true,
    imports: [OverlayPanelModule, CommonModule, CalendarModule, FormsModule],
    templateUrl: './fast-travel.component.html',
    styleUrls: ['./fast-travel.component.scss', '../../styles/lifeline.scss']
})
export class FastTravelComponent implements OnInit, OnDestroy {
    @Input() appendToSelector: string | null = null;
    @Input() event: Event | null = null;

    @ViewChild('op') overlayPanel!: OverlayPanel;

    pickedDate: Date;
    private fastTravelOpenSubscription!: Subscription;

    constructor(public lifelineStateService: LifelineStateService) { }

    updateState(newState: any) {
        console.log("Update state of fast travel", newState);
        // this.lifelineStateService.setFastTravel(newState);
    }

    ngOnInit() {
        this.fastTravelOpenSubscription = this.lifelineStateService.fastTravelOpen$.subscribe((isOpen: boolean) => {
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
        if (this.fastTravelOpenSubscription) {
            this.fastTravelOpenSubscription.unsubscribe();
        }
    }

    onPanelShow() {
        this.lifelineStateService.setFastTravel(true); // Set fastTravelOpen to true when panel is shown
    }

    onPanelHide() {
        this.lifelineStateService.setFastTravel(false); // Set fastTravelOpen to false when panel is hidden
    }

    fastTravel() {
        console.log("Fast travel", this.pickedDate);
        this.overlayPanel.hide();
    }
}
