import { CommonModule, DatePipe } from '@angular/common';
import { Asset } from '../../models/asset';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { FileRemoveEvent, FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';
import { EmotionType } from '../../models/emotionType';
import { NgxTiptapModule } from 'ngx-tiptap';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import { ExtendedTooltipDirective } from '../../directives/extended-tooltip.directive';
import { TooltipOptions } from 'chart.js';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { concatMap, first, mergeMap, tap, toArray } from 'rxjs/operators';
import { DotForm, LifelineDataService } from '../../state/lifeline-data.service';
import { Observable, Subscription, of, map, forkJoin, from } from 'rxjs';
import { AssetService } from '../../services/asset.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'lifeline-dot-form',
  standalone: true,
  providers: [DatePipe],
  imports: [
    FormsModule,
    ButtonModule,
    EditorModule,
    SliderModule,
    CalendarModule,
    AccordionModule,
    TooltipModule,
    FileUploadModule,
    CommonModule,
    NgxTiptapModule,
    ExtendedTooltipDirective],
  templateUrl: './dot-form.component.html',
  styleUrls: ['./dot-form.component.scss', "../../styles/lifeline.scss"]
})
export class DotFormComponent implements OnDestroy, AfterViewInit, OnInit {

  @ViewChild('slider') slider: ElementRef;
  @ViewChild('uploader') uploader: FileUpload;


  editor = new Editor({
    extensions: [StarterKit, Placeholder],
    onUpdate: () => this.onEditorChange(this.editor.getHTML()),
  });


  sliderTooltipOptions!: TooltipOptions;
  sliderAppendTo!: ElementRef;

  dotForm$: Observable<DotForm>;
  stateSub: Subscription;

  selectedAssetCount: number = 0;


  constructor(
    private lifelineData: LifelineDataService,
    private lifelineStateService: LifelineStateService,
    private assetService: AssetService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private renderer: Renderer2) {

    this.dotForm$ = this.lifelineData.dotForm$;
  }

  ngOnInit() {
    Placeholder.configure({
      placeholder: 'Type your thoughts here... 💭',
    });
  }


  onUpload(event: any) {
    for (const file of event.files) {
      // const snapshot = this.lifelineData.snapshot.dotForm;
      // this.lifelineData.updateDotForm({ uploadedFiles: [...snapshot.uploadedFiles, file] });

      this.assetService.createAsset(file).subscribe((response) => {
        console.log("upload res: ", response);
      });
    }

    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  onSelect(event: FileSelectEvent) {
    this.selectedAssetCount += event.files.length;
  }

  onRemove() {
    this.selectedAssetCount--;
  }



  selectEmotion(event: Element) {
    const emotion: EmotionType = event.getAttribute('data-emotion') as EmotionType;
    this.lifelineData.updateDotForm({ selectedEmotion: emotion });

    console.log(emotion);

    this.lifelineStateService.setSelectedEmotion(emotion);



  }

  async onIntensityChange(event: any) {

    this.lifelineData.updateDotForm({ emotionIntensity: event.value });

    // const state = this.lifelineData.snapshot.dotForm;
    // if (!state.selectedEmotion) return;
    // const previousIntensity = state.emotionIntensity;
    //
    // console.log(event.value, "vs", previousIntensity);
    // if (event.value !== previousIntensity) {
    //     console.log(event.value, "vs", previousIntensity);
    //     this.lifelineData.updateDotForm({ emotionIntensity: event.value });
    // }
  }

  onEditorChange(event: any) {
    console.log(event);
    this.lifelineData.updateDotForm({ dotDescription: event });
  }

  public get EmotionType() {
    return EmotionType;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    if (this.stateSub) {
      this.stateSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {



    this.stateSub = this.lifelineData.getState$().subscribe((state) => {
      const emotion = state.dotForm.selectedEmotion;

      const tiptapElement = document.querySelector('.tiptap');
      Object.values(EmotionType).forEach(emotionValue => {
        try {

          this.renderer.removeClass(tiptapElement, emotionValue + '-editor');
        } catch (error) {
          console.log("error removing class: ", error);
        }
      });
      // Add class for the selected emotion
      try {

        this.renderer.addClass(tiptapElement, emotion + '-editor');
      } catch (error) {
        console.log("error adding class: ", error);
      }


    });

  }

  uploadTest() {

    console.log("uploading");
    console.log(this.uploader)
    this.uploader.upload();
  }

  createDot() {


    // from(this.uploader.files).pipe(
    //   mergeMap((file: File) => {
    //     return this.assetService.createAsset(file);
    //   })
    // ).pipe(
    //   // Combine all the image upload results
    //   toArray()
    // ).pipe(
    //   tap((assets) => {
    //     console.log(assets)
    //     this.lifelineData.updateDotForm({ uploadedFiles: assets.map(e => e.asset) });
    //     console.log(this.lifelineData.snapshot.dotForm)
    //   }),
    // ).subscribe(
    //
    // )

    from(this.uploader.files).pipe(
      concatMap((file: File) => this.assetService.createAsset(file)),
      toArray(), // Collect all asset creation results into an array
      tap((assets) => {
        console.log(assets);
        // Update dot form with uploaded asset information
        this.lifelineData.updateDotForm({ uploadedFiles: assets.map(e => e.asset) });
        console.log(this.lifelineData.snapshot.dotForm);
      }),
      concatMap(() => this.lifelineData.saveDot(this.datePipe).pipe(first()))
    ).subscribe(
      (dotResponse) => {
        console.log('Dot creation response:', dotResponse);
        const currentCalendarDate = this.lifelineStateService.calendarCurrentDateSnapshot;
        this.lifelineStateService.setCalendarCurrentDate(currentCalendarDate);
        this.lifelineStateService.setRightPanel(false);
        this.messageService.add(
          { key: 'dotCreation', severity: 'success', summary: 'Dot creation', detail: 'Successfully created dot!' }
        );

      })


  }
}
