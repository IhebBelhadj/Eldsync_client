import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, } from '@angular/core';
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

@Component({
    selector: 'lifeline-dot-form',
    standalone: true,

    imports: [FormsModule, ButtonModule, EditorModule, SliderModule, CalendarModule, AccordionModule, TooltipModule, FileUploadModule, CommonModule, NgxTiptapModule, ExtendedTooltipDirective],
    templateUrl: './dot-form.component.html',
    styleUrls: ['./dot-form.component.scss', "../../styles/lifeline.scss"]
})
export class DotFormComponent implements OnDestroy, AfterViewInit {

    @ViewChild('slider') slider: ElementRef;

    dotDescription: string = '';
    emotionIntensity: number = 0;
    eventDate: Date = new Date();
    selectedEmotion!: EmotionType
    uploadedFiles: any[] = [];


    editor = new Editor({
        extensions: [StarterKit],
    });

    value = '<p>What do you have in mind 💭</p>';

    sliderTooltipOptions!: TooltipOptions;
    sliderAppendTo!: ElementRef;

    constructor(private lifelineStateService: LifelineStateService, private renderer: Renderer2) {

    }


    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    onBasicUpload() {
        // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

    selectEmotion(event: Element) {
        const emotion: EmotionType = event.getAttribute('data-emotion') as EmotionType;
        this.selectedEmotion = emotion;

        console.log(emotion);

        this.lifelineStateService.setSelectedEmotion(emotion);

        const tiptapElement = document.querySelector('.tiptap');
        Object.values(EmotionType).forEach(emotionValue => {
            this.renderer.removeClass(tiptapElement, emotionValue + '-editor');
        });
        // Add class for the selected emotion
        this.renderer.addClass(tiptapElement, emotion + '-editor');


    }

    async onIntensityChange() {
        if (!this.selectedEmotion) return;
        const previousIntensity = await this.lifelineStateService.selectedEmotionIntensity$
            .pipe(
                first()
            )
            .toPromise();
        if (this.emotionIntensity !== previousIntensity) {
            this.lifelineStateService.setSelectedEmotionIntensity(this.emotionIntensity);
            console.log(this.emotionIntensity);
        }
    }

    public get EmotionType() {
        return EmotionType;
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    ngAfterViewInit(): void {

        console.log(this.slider.nativeElement);
    }
}
