import { Injectable } from '@angular/core';
import { Observable } from '@apollo/client/utilities';
import { BehaviorSubject, map } from 'rxjs';
import { EmotionType } from '../models/emotionType';
import { DotForm, LifelineDataService } from './lifeline-data.service';

export interface LifelineState {
    rightPanelOpen: boolean;
    fastTravelOpen: boolean;
    filtersPanelOpen: boolean;
    settingsPanelOpen: boolean;
    rightPanelAction: string;

    // emotion tracking
    selectedEmotion: EmotionType;
    selectedEmotionIntensity: number;
}


@Injectable({
    providedIn: 'root'
})
export class LifelineStateService {

    private stateSubject: BehaviorSubject<LifelineState> = new BehaviorSubject<LifelineState>({
        rightPanelOpen: false,
        fastTravelOpen: false,
        filtersPanelOpen: false,
        settingsPanelOpen: false,
        rightPanelAction: "add",
        selectedEmotion: null,
        selectedEmotionIntensity: 1,
    });

    constructor(private lifelineData: LifelineDataService) {

        this.lifelineData.dotForm$.subscribe((dotForm: DotForm) => {
            if (this.stateSubject.getValue().rightPanelAction === "add")
                this.updateState({
                    selectedEmotion: dotForm.selectedEmotion,
                    selectedEmotionIntensity: dotForm.emotionIntensity
                });
        });
    }

    // Observable to subscribe to state changes
    getState$() {
        return this.stateSubject.asObservable();
    }

    get rightPanelOpen$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.rightPanelOpen)
        );
    }

    get fastTravelOpen$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.fastTravelOpen)
        );
    }

    get filtersPanelOpen$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.filtersPanelOpen)
        );
    }

    get settingsPanelOpen$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.settingsPanelOpen)
        );
    }

    // Getter for rightPanelContent
    get rightPanelAction$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.rightPanelAction)
        );
    }

    get selectedEmotion$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.selectedEmotion)
        );
    }

    get selectedEmotionIntensity$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.selectedEmotionIntensity)
        )
    }

    // Method to update state
    updateState(newState: Partial<LifelineState>) {
        const currentState = this.stateSubject.getValue();
        const updatedState = { ...currentState, ...newState };
        this.stateSubject.next(updatedState);
    }

    // Method to toggle right panel
    setRightPanel(open: boolean) {
        this.updateState({ rightPanelOpen: open });
    }

    setFastTravel(open: boolean) {
        this.updateState({ fastTravelOpen: open });
    }

    setFiltersPanel(open: boolean) {
        this.updateState({ filtersPanelOpen: open });
    }

    toggleFastTravel() {
        const currentState = this.stateSubject.getValue();
        const updatedState = { ...currentState, fastTravelOpen: !currentState.fastTravelOpen };
        this.stateSubject.next(updatedState);
    }

    toggleRightPanel() {
        const currentState = this.stateSubject.getValue();
        const updatedState = { ...currentState, rightPanelOpen: !currentState.rightPanelOpen };
        this.stateSubject.next(updatedState);
    }

    toggleFilterPanel() {
        const currentState = this.stateSubject.getValue();
        const updatedState = { ...currentState, filtersPanelOpen: !currentState.filtersPanelOpen };
        this.stateSubject.next(updatedState);
    }

    toggleSettingsPanel() {
        const currentState = this.stateSubject.getValue();
        const updatedState = { ...currentState, settingsPanelOpen: !currentState.settingsPanelOpen };
        this.stateSubject.next(updatedState);
    }

    setSettingsPanel(open: boolean) {
        this.updateState({ settingsPanelOpen: open });
    }

    // Method to set right panel content
    setRightPanelAction(content: string) {
        this.updateState({ rightPanelAction: content });
    }

    setSelectedEmotion(emotion: EmotionType) {
        this.updateState({ selectedEmotion: emotion });
    }

    setSelectedEmotionIntensity(intensity: number) {
        this.updateState({ selectedEmotionIntensity: intensity })
    }
}
