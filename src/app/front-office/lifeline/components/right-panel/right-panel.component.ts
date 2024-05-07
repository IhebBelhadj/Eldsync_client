import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DotFormComponent } from '../dot-form/dot-form.component';
import { DotCreationCancelState, LifelineState, LifelineStateService } from '../../state/lifeline-state.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Observable, Subscription, map } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { EmotionState, emotionStates } from '../../state/emotion.states';
import { EmotionType } from '../../models/emotionType';
import { ConfirmationStateService } from '../../state/confirmation-state.service';
import { LifelineDataService } from '../../state/lifeline-data.service';
import { DotContentComponent } from '../dot-content/dot-content.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { DotService } from '../../services/dot.service';

@Component({
  selector: 'lifeline-right-panel',
  standalone: true,
  imports: [ButtonModule, DotFormComponent, DotContentComponent, CommonModule, DialogModule, TagModule, TooltipModule, SpeedDialModule],
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


  rightPanelOpen$: Observable<boolean>;
  stateSubscription!: Subscription;
  emotionState: EmotionState;

  selectedEmotion: EmotionType;
  selectedEmotionIntensity: number;

  rightPanelAction$: Observable<string>;

  cancelDotCreationSubscription: Subscription;

  emotionState$: Observable<EmotionState>;

  dotOptions: MenuItem[] = [
    { label: 'Delete', icon: 'pi pi-trash', command: () => { this.removeCurrentDot() } },
    { label: 'Edit', icon: 'pi pi-pencil', command: () => { console.log('Edit') } },
  ]


  constructor(
    public lifelineService: LifelineStateService,
    private lifelineData: LifelineDataService,
    private confirmationService: ConfirmationStateService,
    private changeDetector: ChangeDetectorRef,
    private dotService: DotService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.rightPanelOpen$ = this.lifelineService.rightPanelOpen$.pipe(
      map((isOpen: boolean) => {
        if (
          this.lifelineService.snapshot.rightPanelOpen == false &&
          isOpen &&
          this.lifelineService.snapshot.rightPanelAction == 'add'
        ) {
          console.log('this code is working')
          this.removeDot();
        }
        return isOpen;
      }))




    this.emotionState$ = this.lifelineService.getState$().pipe(
      map((state: LifelineState) => {
        this.selectedEmotion = state.selectedEmotion;
        this.selectedEmotionIntensity = state.selectedEmotionIntensity;

        if (!this.selectedEmotion || this.selectedEmotionIntensity < 1) {
          return null;
        }

        const emotionState = emotionStates.find(
          emotionState => emotionState.emotion === this.selectedEmotion
        )?.states.find(
          s => s.intensity === this.selectedEmotionIntensity
        );

        console.log('Emotion state:', emotionState);

        return emotionState;
      })
    );

    this.rightPanelAction$ = this.lifelineService.rightPanelAction$;

    this.cancelDotCreationSubscription = this.lifelineService.cancelDotCreationObservable$().subscribe(request => {
      if (request == DotCreationCancelState.PENDING) {
        this.removeDot();
      }
    })



  }

  ngOnDestroy() {



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


  removeCurrentDot() {

    this.confirmationService.addToQueue('deleteCurrentDot', {
      message: 'Are you sure you want to remove the currently selected dot?',
    });

    const resultSub = this.confirmationService.confirmationResult$
      .subscribe(result => {
        if (result.eventId === 'deleteCurrentDot') {
          if (result.result === 'success') {
            // Logic to delete the dot
            this.commitRemoveCurrentDot();
          } else {
            console.log('Dot deletion canceled');
          }
          resultSub.unsubscribe();
        }
      });
  }

  cancelDotCreation() {

    console.log('removing dot from state');
    this.lifelineService.setRightPanel(false);
    this.messageService.add(
      { key: 'dotCreation', severity: 'info', summary: 'Dot creation', detail: 'Canceled dot creation' }
    );
    this.lifelineData.resetDotForm();
    this.lifelineService.setSelectedEmotion(null);
    this.lifelineService.setSelectedEmotionIntensity(0);

  }

  commitRemoveCurrentDot() {

    console.log('removing current dot from state');
    console.log(this.lifelineData.snapshot.selectedDotId)
    const currentDot = this.lifelineData.snapshot.selectedDotId;
    console.log('Current dot:', currentDot);
    this.lifelineService.setRightPanel(false);

    this.dotService.deleteDot(currentDot).subscribe((res) => {
      console.log('Dot deleted:', res);
      this.messageService.add(
        { key: 'dotCreation', severity: 'info', summary: 'Dot creation', detail: 'Dot deleted!' }
      );
    });
    this.lifelineService.setSelectedEmotion(null);
    this.lifelineService.setSelectedEmotionIntensity(0);

  }

  closePanel() {
    this.lifelineService.setRightPanel(false);
    this.lifelineService.setSelectedEmotion(null);
    this.lifelineService.setSelectedEmotionIntensity(0);
  }


}
