import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';
import { Dot } from '../../models/dot';
import { CommonModule } from '@angular/common';
import { EmotionType } from '../../models/emotionType';
import { EmotionState, emotionStates } from '../../state/emotion.states';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'lifeline-dot-inspect',
    standalone: true,
    imports: [OverlayPanelModule, CommonModule, TagModule],
    templateUrl: './dot-inspect.component.html',
    styleUrl: './dot-inspect.component.scss'
})
export class DotInspectComponent implements OnInit, OnDestroy {


    selectedDot: Dot;
    emotionState: EmotionState;

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
                    const dotInspectData = this.lifelineState.dotInspectDataSnapshot;
                    this.selectedDot = dotInspectData.dot;
                    console.log("showing overlay panel", dotInspectData);

                    this.emotionState = emotionStates.find(
                        emotionState => emotionState.emotion === this.selectedDot.emotionType
                    )?.states.find(
                        s => s.intensity === this.selectedDot.emotionIntensity
                    );

                    this.overlayPanel.show(dotInspectData.event, dotInspectData.selector); // Show the overlay panel
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


    getEmotionClass(emotionType: EmotionType): string {
        return emotionType ? `${emotionType as string}-tagBg` : '';

    }
}
