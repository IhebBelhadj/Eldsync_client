import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { EmotionType } from '../models/emotionType';

export interface DotForm {
    selectedEmotion: EmotionType,
    dotDescription: string,
    emotionIntensity: number,
    eventDate: Date,
    uploadedFiles: any[]
}

export interface LifelineData {
    dotForm: DotForm
}

@Injectable({
    providedIn: 'root'
})
export class LifelineDataService {

    private stateSubject: BehaviorSubject<LifelineData> = new BehaviorSubject<LifelineData>({
        dotForm: {
            selectedEmotion: null,
            dotDescription: '',
            emotionIntensity: 1,
            eventDate: new Date(),
            uploadedFiles: []
        }
    });

    constructor() { }


    getState$() {
        return this.stateSubject.asObservable();
    }

    get snapshot(): LifelineData {
        return this.stateSubject.getValue();
    }

    get dotForm$(): any {
        return this.stateSubject.asObservable().pipe(
            map(state => state.dotForm)
        );
    }

    updateDotForm(dotForm: Partial<DotForm>) {

        const currentState = this.stateSubject.getValue();
        const updatedState = { ...currentState, dotForm: { ...currentState.dotForm, ...dotForm } };
        this.stateSubject.next(updatedState);

    }

    resetDotForm() {
        this.updateDotForm({
            selectedEmotion: null,
            dotDescription: '',
            emotionIntensity: 1,
            eventDate: new Date(),
            uploadedFiles: []
        });
    }
}
