import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject } from 'rxjs';
import { EmotionType } from '../models/emotionType';
import { DotForm, LifelineDataService } from './lifeline-data.service';
import { Dot } from '../models/dot';

export interface LifelineState {
  rightPanelOpen: boolean;
  fastTravelOpen: boolean;
  filtersPanelOpen: boolean;
  settingsPanelOpen: boolean;
  rightPanelAction: string;
  rightPanelPosition: string;
  dotInspectOpen: boolean;

  // emotion tracking
  selectedEmotion: EmotionType;
  selectedEmotionIntensity: number;

  // calendar tracking
  calendarCurrentDate: Date;

  //asset inspection
  imageToInspect: string;
  inspector: boolean;
}

export interface dotInspectData {
  event?: any;
  selector?: any;
  dot?: Dot;
}

export enum DotCreationCancelState {
  CLEARED, PENDING, VALIDATED
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
    dotInspectOpen: false,
    rightPanelAction: "add",
    rightPanelPosition: 'right',
    selectedEmotion: null,
    selectedEmotionIntensity: 1,
    calendarCurrentDate: new Date(),
    imageToInspect: "",
    inspector: false,
  });

  private dotInspectData: dotInspectData;
  private cancelDotCreation: BehaviorSubject<DotCreationCancelState> =
    new BehaviorSubject<DotCreationCancelState>(DotCreationCancelState.CLEARED);
  private calendarRefresh: Subject<void> = new Subject<void>();


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

  get rightPanelOpen$(): Observable<boolean> {
    return this.stateSubject.pipe(
      map(state => state.rightPanelOpen),
      distinctUntilChanged((prev, curr) => prev === curr) // Compare references
    );
  }

  get fastTravelOpen$(): Observable<boolean> {
    return this.stateSubject.pipe(
      map(state => state.fastTravelOpen),
      distinctUntilChanged((prev, curr) => prev === curr)
    );
  }

  get filtersPanelOpen$(): Observable<boolean> {
    return this.stateSubject.pipe(
      map(state => state.filtersPanelOpen),
      distinctUntilChanged((prev, curr) => prev === curr)
    );
  }

  get settingsPanelOpen$(): Observable<boolean> {
    return this.stateSubject.pipe(
      map(state => state.settingsPanelOpen),
      distinctUntilChanged((prev, curr) => prev === curr)
    );
  }

  get dotInspectOpen$(): Observable<boolean> {
    return this.stateSubject.pipe(
      map(state => state.dotInspectOpen),
      distinctUntilChanged((prev, curr) => prev === curr)
    );
  }

  get inspector$(): Observable<boolean> {
    return this.stateSubject.pipe(
      map(state => state.inspector),
      distinctUntilChanged((prev, curr) => prev === curr)
    );
  }

  get calendarRefresh$(): Observable<void> {
    return this.calendarRefresh.asObservable();
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

  get calendarCurrentDate$() {
    return this.stateSubject.pipe(
      distinctUntilChanged((prev, curr) => prev.calendarCurrentDate === curr.calendarCurrentDate),
      map(state => state.calendarCurrentDate)
    );
  }

  get calendarCurrentDateSnapshot(): Date {
    return this.stateSubject.getValue().calendarCurrentDate;
  }

  get snapshot(): LifelineState {
    return this.stateSubject.getValue();
  }

  get dotInspectDataSnapshot(): dotInspectData {
    return this.dotInspectData;
  }

  // Method to update state
  updateState(newState: Partial<LifelineState>) {
    const currentState = this.stateSubject.getValue();
    const updatedState = { ...currentState, ...newState };
    this.stateSubject.next(updatedState);
  }

  refreshCalendar() {
    this.calendarRefresh.next();
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

  setDotInspect(open: boolean) {
    this.updateState({ dotInspectOpen: open });
  }

  setCalendarCurrentDate(date: Date) {
    console.log("setting date to: ", date);
    this.updateState({ calendarCurrentDate: date });
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

  setDotInspectData(event: any, selector: any, dot: Dot) {
    this.dotInspectData = {
      event, selector, dot
    }
  }

  cancelDotCreationObservable$(): Observable<DotCreationCancelState> {
    return this.cancelDotCreation.asObservable();
  }

  initCancelDotCreationRequest$(): Observable<DotCreationCancelState> {

    this.cancelDotCreation.next(DotCreationCancelState.PENDING);
    // listens to the cancel creation observable
    return this.cancelDotCreationObservable$();
  }

  clearCancelDotCreationRequest$(): Observable<DotCreationCancelState> {
    this.cancelDotCreation.next(DotCreationCancelState.CLEARED);
    return this.cancelDotCreationObservable$();
  }

  validateCancelDotCreationRequest$(): Observable<DotCreationCancelState> {
    this.cancelDotCreation.next(DotCreationCancelState.VALIDATED);
    return this.cancelDotCreationObservable$();
  }

  setInspector(open: boolean) {
    this.updateState({ inspector: open });
  }

  setImageToInspect(imageSrc: string) {
    this.updateState({ imageToInspect: imageSrc });
  }
}
