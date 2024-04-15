import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { EmotionType } from '../../models/emotionType';
import { Subscription } from 'rxjs';

@Component({
    selector: 'lifeline-ambient-background',
    standalone: true,
    imports: [],
    templateUrl: './ambient-background.component.html',
    styleUrl: './ambient-background.component.scss'
})
export class AmbientBackgroundComponent implements AfterViewInit, OnDestroy {

    stateSubscription: Subscription;
    maxIntensity: number;

    @ViewChild('ambientBackground', { static: true }) ambientBackground: ElementRef;
    constructor(private lifelineStateService: LifelineStateService) { }

    ngAfterViewInit(): void {
        this.stateSubscription = this.lifelineStateService.getState$().subscribe((state) => {
            this.updateBackgroundClasses(state.selectedEmotion, state.selectedEmotionIntensity);
        });
    }

    ngOnDestroy(): void {
        if (this.stateSubscription) this.stateSubscription.unsubscribe();
    }


    private updateBackgroundClasses(emotion: EmotionType, intensity: number): void {
        if (!emotion) return;

        Object.values(EmotionType).forEach(emotionValue => {
            this.ambientBackground.nativeElement.classList.remove(`${emotionValue}-ambientBg`);
        });

        this.ambientBackground.nativeElement.classList.add(`${emotion}-ambientBg`);

        // Remove existing opacity classes
        this.maxIntensity = 5;
        const classesToRemove = Array.from({ length: this.maxIntensity }, (_, i) => `lvl${i + 1}`);
        this.ambientBackground.nativeElement.classList.remove(...classesToRemove);

        // Add opacity class based on intensity
        if (intensity) {
            this.ambientBackground.nativeElement.classList.add(`lvl${intensity}`);
        }
    }


}
