import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';
import { EmotionType } from '../../models/emotionType';
import { NgxTiptapModule } from 'ngx-tiptap';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { ExtendedTooltipDirective } from '../../directives/extended-tooltip.directive';
import { TooltipOptions } from 'chart.js';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { first } from 'rxjs/operators';
import { DotForm, LifelineDataService } from '../../state/lifeline-data.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'lifeline-dot-form',
    standalone: true,

    imports: [FormsModule, ButtonModule, EditorModule, SliderModule, CalendarModule, AccordionModule, TooltipModule, FileUploadModule, CommonModule, NgxTiptapModule, ExtendedTooltipDirective],
    templateUrl: './dot-form.component.html',
    styleUrls: ['./dot-form.component.scss', "../../styles/lifeline.scss"]
})
export class DotFormComponent implements OnDestroy, AfterViewInit, OnInit {

    @ViewChild('slider') slider: ElementRef;


    editor = new Editor({
        extensions: [StarterKit],
        onUpdate: () => this.onEditorChange(this.editor.getHTML()),
    });

    value = '<p>What do you have in mind 💭</p>';

    sliderTooltipOptions!: TooltipOptions;
    sliderAppendTo!: ElementRef;

    dotForm$: Observable<DotForm>;

    constructor(
        private lifelineData: LifelineDataService,
        private lifelineStateService: LifelineStateService,
        private renderer: Renderer2) {

        this.dotForm$ = this.lifelineData.dotForm$;
    }

    ngOnInit() {
    }


    onUpload(event: any) {
        for (const file of event.files) {
            const snapshot = this.lifelineData.snapshot.dotForm;
            this.lifelineData.updateDotForm({ uploadedFiles: [...snapshot.uploadedFiles, file] });
        }

        // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
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
    }

    ngAfterViewInit(): void {
        this.lifelineData.getState$().subscribe((state) => {
            const emotion = state.dotForm.selectedEmotion;

            const tiptapElement = document.querySelector('.tiptap');
            Object.values(EmotionType).forEach(emotionValue => {
                this.renderer.removeClass(tiptapElement, emotionValue + '-editor');
            });
            // Add class for the selected emotion
            this.renderer.addClass(tiptapElement, emotion + '-editor');


        });

    }
}
