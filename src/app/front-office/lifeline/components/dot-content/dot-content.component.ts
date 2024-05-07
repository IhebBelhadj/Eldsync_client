import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DotService } from '../../services/dot.service';
import { LifelineDataService } from '../../state/lifeline-data.service';
import { switchMap, Observable, tap, map, concatMap, of, from, toArray } from 'rxjs';
import { Dot } from '../../models/dot';
import { CommonModule } from '@angular/common';
import { EmotionState, getEmotionState } from '../../state/emotion.states';
import { EmotionType } from '../../models/emotionType';
import { TagModule } from 'primeng/tag';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { GalleriaModule } from 'primeng/galleria';
import { AssetService } from '../../services/asset.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { Asset } from '../../models/asset';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'lifeline-dot-content',
  standalone: true,
  imports: [CommonModule, TagModule, GalleriaModule, ImageModule, ButtonModule, CarouselModule, DialogModule],
  templateUrl: './dot-content.component.html',
  styleUrl: './dot-content.component.scss'
})
export class DotContentComponent implements OnInit {

  @ViewChild('carousel') carousel: Carousel;

  constructor(
    private dotService: DotService,
    private assetService: AssetService,
    private lifelineData: LifelineDataService,
    private lifelineState: LifelineStateService,

  ) { }
  selectedDot$: Observable<Dot>;
  selectedDot: Dot;
  emotionState: EmotionState;
  imageLinks = [];



  ngOnInit() {

    this.selectedDot$ = this.lifelineData.selectedDotId$.pipe(
      switchMap((dotId: string) => this.dotService.getDotById(dotId, `

                idDot
                eventDate
                dotMarkdown
                emotionType
                emotionIntensity
                assets {
                  assetId
                  fileName
                  fileType
                  filePath
                  accessLink
                }

            `)),
      tap((dot: Dot) => {
        console.log('Selected dot:', dot);
        this.emotionState = getEmotionState(dot.emotionType, dot.emotionIntensity);
        this.lifelineState.setSelectedEmotion(dot.emotionType);
        this.lifelineState.setSelectedEmotionIntensity(dot.emotionIntensity);


        this.imageLinks = [];

        if (dot.assets.length > 0) {
          from(dot.assets).pipe(
            concatMap((asset: Asset) => {
              return this.assetService.getAsset(asset.accessLink)
            }),
            tap((asset) => {
              console.log('asset', asset)
              this.imageLinks.push({ itemImageSrc: URL.createObjectURL(asset) });
              // console.log('Image links:', this.imageLinks);

            })
          ).subscribe(() => {
            this.carousel.cd.detectChanges();
          });

        }


      }),

    )




  }

  getEmotionClass(emotionType: EmotionType): string {
    return emotionType ? `${emotionType as string}-tagBg` : '';

  }


  imageInspect($event: any) {
    this.lifelineState.setImageToInspect($event.target.src);

    this.lifelineState.setInspector(true);
    console.log('Inspecting image:', $event.target.src);
  }


}
