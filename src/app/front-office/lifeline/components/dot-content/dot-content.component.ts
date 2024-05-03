import { Component, OnInit } from '@angular/core';
import { DotService } from '../../services/dot.service';
import { LifelineDataService } from '../../state/lifeline-data.service';
import { switchMap, Observable, tap, map } from 'rxjs';
import { Dot } from '../../models/dot';
import { CommonModule } from '@angular/common';
import { EmotionState, getEmotionState } from '../../state/emotion.states';
import { EmotionType } from '../../models/emotionType';
import { TagModule } from 'primeng/tag';
import { LifelineStateService } from '../../state/lifeline-state.service';

@Component({
    selector: 'lifeline-dot-content',
    standalone: true,
    imports: [CommonModule, TagModule],
    templateUrl: './dot-content.component.html',
    styleUrl: './dot-content.component.scss'
})
export class DotContentComponent implements OnInit {

    constructor(
        private dotService: DotService,
        private lifelineData: LifelineDataService,
        private lifelineState: LifelineStateService,
    ) { }
    selectedDot$: Observable<Dot>;
    emotionState: EmotionState;
    ngOnInit() {
        this.selectedDot$ = this.lifelineData.selectedDotId$.pipe(
            switchMap((dotId: string) => this.dotService.getDotById(dotId, `

                idDot
                eventDate
                dotMarkdown
                emotionType
                emotionIntensity

            `)),
            tap((dot: Dot) => {
                console.log('Selected dot:', dot);
                this.emotionState = getEmotionState(dot.emotionType, dot.emotionIntensity);
                this.lifelineState.setSelectedEmotion(dot.emotionType);
                this.lifelineState.setSelectedEmotionIntensity(dot.emotionIntensity);
            })
        )

    }

    getEmotionClass(emotionType: EmotionType): string {
        return emotionType ? `${emotionType as string}-tagBg` : '';

    }


}
