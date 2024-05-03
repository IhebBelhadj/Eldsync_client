import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DotFormComponent } from '../dot-form/dot-form.component';
import { DotCreationCancelState, LifelineState, LifelineStateService } from '../../state/lifeline-state.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { EmotionState, emotionStates } from '../../state/emotion.states';
import { EmotionType } from '../../models/emotionType';
import { ConfirmationStateService } from '../../state/confirmation-state.service';
import { LifelineDataService } from '../../state/lifeline-data.service';
import { DotContentComponent } from '../dot-content/dot-content.component';

@Component({
    selector: 'lifeline-right-panel',
    standalone: true,
    imports: [ButtonModule, DotFormComponent, DotContentComponent, CommonModule, DialogModule, TagModule, TooltipModule],
    templateUrl: './right-panel.component.html',
    styleUrls: ['./right-panel.component.scss', '../../styles/lifeline.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(40vw)', opacity: 0 }),
                animate('200ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-out', style({ transform: 'translateX(10vw)', opacity: 0 }))
            ])
        ])
    ]

})
export class RightPanelComponent implements OnInit, OnDestroy {


    rightPanelSubscription!: Subscription;
    rightPanelOpen!: boolean;
    stateSubscription!: Subscription;
    emotionState: EmotionState;

    selectedEmotion: EmotionType;
    selectedEmotionIntensity: number;

    rightPanelAction: string;

    rightPanelActionSubscription: Subscription;
    cancelDotCreationSubscription: Subscription;


    constructor(
        public lifelineService: LifelineStateService,
        private lifelineData: LifelineDataService,
        private confirmationService: ConfirmationStateService
    ) { }

    ngOnInit() {
        this.rightPanelSubscription = this.lifelineService.rightPanelOpen$.subscribe((isOpen: boolean) => {
            if (this.rightPanelOpen && isOpen && this.lifelineService.snapshot.rightPanelAction == 'add') {
                this.removeDot();
            }
            this.rightPanelOpen = isOpen;
        });

        this.stateSubscription = this.lifelineService.getState$().subscribe((state: LifelineState) => {
            this.selectedEmotion = state.selectedEmotion;
            this.selectedEmotionIntensity = state.selectedEmotionIntensity;

            if (!this.selectedEmotion || this.selectedEmotionIntensity < 1) this.emotionState = null;

            this.emotionState = emotionStates.find(
                emotionState => emotionState.emotion === this.selectedEmotion
            )?.states.find(
                s => s.intensity === this.selectedEmotionIntensity
            );
        });

        this.rightPanelActionSubscription = this.lifelineService.rightPanelAction$.subscribe((action: string) => {
            this.rightPanelAction = action;
        });

        this.cancelDotCreationSubscription = this.lifelineService.cancelDotCreationObservable$().subscribe(request => {
            if (request == DotCreationCancelState.PENDING) {
                this.removeDot();
            }
        })



    }

    ngOnDestroy() {
        if (this.rightPanelSubscription) {
            this.rightPanelSubscription.unsubscribe();
        }
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
        if (this.rightPanelActionSubscription) {
            this.rightPanelActionSubscription.unsubscribe();
        }
        if (this.cancelDotCreationSubscription) {
            this.cancelDotCreationSubscription.unsubscribe();
        }
    }

    onHide() {
        console.log("Hide right panel")
        this.lifelineService.setRightPanel(false);
    }

    onShow() {
        this.lifelineService.setRightPanel(true);
    }

    getEmotionClass(emotionType: EmotionType): string {
        return emotionType ? `${emotionType as string}-tagBg` : '';

    }

    initRemoveDotRequest() {
        this.lifelineService.initCancelDotCreationRequest$();
    }
    removeDot() {

        this.confirmationService.addToQueue('deleteDot', {
            message: 'Are you sure you want to cancel dot creation?',
        });

        const resultSub = this.confirmationService.confirmationResult$
            .subscribe(result => {
                if (result.eventId === 'deleteDot') {
                    if (result.result === 'success') {
                        // Logic to delete the dot
                        this.cancelDotCreation();
                        this.lifelineService.validateCancelDotCreationRequest$();
                    } else {
                        console.log('Dot deletion canceled');
                        this.lifelineService.clearCancelDotCreationRequest$();
                    }
                    resultSub.unsubscribe();
                }
            });
    }

    cancelDotCreation() {

        console.log('removing dot from state');
        this.lifelineService.setRightPanel(false);
        this.lifelineData.resetDotForm();
        this.lifelineService.setSelectedEmotion(null);
        this.lifelineService.setSelectedEmotionIntensity(0);

    }


}