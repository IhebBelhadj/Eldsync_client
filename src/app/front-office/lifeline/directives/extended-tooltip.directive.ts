import { AfterViewInit, Directive, ElementRef, Input, NgZone, Renderer2, ViewContainerRef } from '@angular/core';
import { Tooltip } from "primeng/tooltip";
import { PrimeNGConfig } from 'primeng/api';


@Directive({
    selector: '[ext-tooltip]',
    standalone: true
})
export class ExtendedTooltipDirective extends Tooltip implements AfterViewInit {

    @Input('ext-tooltip')
    _text: any;

    @Input('stickTo')
    stickTo: string;

    constructor(el: ElementRef, viewContainerRef: ViewContainerRef, renderer: Renderer2, zone: NgZone, config: PrimeNGConfig) {
        super(null, el, zone, config, renderer, viewContainerRef)
    }

    override ngAfterViewInit(): void {

        this.el = new ElementRef(this.el.nativeElement.querySelector(this.stickTo));
    }

}
