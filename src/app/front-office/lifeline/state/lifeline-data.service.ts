import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, map, Observable, throwError } from 'rxjs';
import { EmotionType } from '../models/emotionType';
import { DotService } from '../services/dot.service';
import { DotInput } from '../models/dot-input';
import { DatePipe } from '@angular/common';
import { Dot } from '../models/dot';
import { Asset } from '../models/asset';

export interface DotForm {
  selectedEmotion: EmotionType,
  dotDescription: string,
  emotionIntensity: number,
  eventDate: Date,
  uploadedFiles: Asset[]
}

export interface EmotionRates {
  happy: number,
  angry: number,
  sad: number,
  loving: number,
  grateful: number
}

export interface LifelineData {
  dotForm: DotForm,
  selectedDot: Dot | null,
  selectedDotId: string | null,
  emotionRates: EmotionRates
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
    },
    selectedDot: null,
    selectedDotId: null,

    emotionRates: {
      happy: 0,
      sad: 0,
      loving: 0,
      grateful: 0,
      angry: 0
    }
  });

  constructor(
    private dotService: DotService,
  ) { }


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

  get selectedDot$(): any {
    return this.stateSubject.asObservable().pipe(
      map(state => state.selectedDot)
    );
  }

  get selectedDotId$(): any {
    return this.stateSubject.asObservable().pipe(
      map(state => state.selectedDotId)
    );
  }

  get emotionRates$(): any {
    return this.stateSubject.asObservable().pipe(
      distinctUntilChanged((prev, curr) => prev.emotionRates === curr.emotionRates),

      map(state => state.emotionRates)
    )
  }

  updateDotForm(dotForm: Partial<DotForm>) {

    const currentState = this.stateSubject.getValue();
    const updatedState = { ...currentState, dotForm: { ...currentState.dotForm, ...dotForm } };
    this.stateSubject.next(updatedState);

  }

  updateEmotionRates(emotionRates: Partial<EmotionRates>) {
    const currentState = this.stateSubject.getValue();
    const updatedState = { ...currentState, emotionRates: { ...currentState.emotionRates, ...emotionRates } };
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

  setSelectedDotId(dotId: string) {
    const currentState = this.stateSubject.getValue();
    this.stateSubject.next({ ...currentState, selectedDotId: dotId });
  }

  saveDot(datePipe: DatePipe): Observable<any> {
    const state = this.stateSubject.getValue();
    console.log(state.dotForm.selectedEmotion);
    const dotData: DotInput = {
      emotionType: state.dotForm.selectedEmotion,
      emotionIntensity: state.dotForm.emotionIntensity,
      dotMarkdown: state.dotForm.dotDescription,
      elderId: 1,
      eventDate: datePipe.transform(state.dotForm.eventDate, 'yyyy-MM-ddTHH:mm:ss'),
      assets: state.dotForm.uploadedFiles.map(f => f.assetId),
    };

    return this.dotService.createDot(dotData, `
            idDot
            eventDate
            dotMarkdown
            emotionType
            emotionIntensity

        `).pipe(
      map((response: any) => {
        this.resetDotForm();
        return response;
      }),
      catchError((error) => {
        console.error('Error saving dot:', error);
        return throwError(error);
      })
    )
  }
}
