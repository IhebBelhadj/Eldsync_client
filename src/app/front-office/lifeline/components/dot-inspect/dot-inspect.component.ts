import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';

@Component({
    selector: 'lifeline-dot-inspect',
    standalone: true,
    imports: [OverlayPanelModule],
    templateUrl: './dot-inspect.component.html',
    styleUrl: './dot-inspect.component.scss'
})
export class DotInspectComponent implements OnInit, OnDestroy {

    @Input() appendToSelector: string | null = null;
    @Input() event: Event | null = null;

    @ViewChild('op') overlayPanel!: OverlayPanel;

    stateSubscription!: Subscription;
    constructor(private lifelineState: LifelineStateService) { }

    onPanelShow() {
        this.lifelineState.setDotInspect(true); // Set dotInspectOpen to true when panel is shown
    }

    onPanelHide() {
        this.lifelineState.setDotInspect(false); // Set dotInspectOpen to false when panel is hidden
    }

    ngOnInit() {
        this.stateSubscription = this.lifelineState.dotInspectOpen$.subscribe((isOpen: boolean) => {
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
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    }
}
