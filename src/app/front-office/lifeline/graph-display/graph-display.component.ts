import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import { Application } from 'pixi.js';
// import { Viewport } from 'pixi-viewport';
@Component({
    selector: 'lifeline-graph',
    standalone: true,
    imports: [],
    templateUrl: './graph-display.component.html',
    styleUrl: './graph-display.component.scss'
})
export class GraphDisplayComponent implements AfterViewInit {

    @ViewChild('lifelineCanvas') lifelineCanvas: ElementRef;

    // app: Application;
    // viewport: Viewport;

    constructor() {
    }

    ngAfterViewInit() {
        // this.start();
    }

    // private async start() {
    //     this.app = new Application();
    //
    //
    //     this.app.view.style.height = "100%";
    //     this.app.view.style.width = "100%";
    //     this.lifelineCanvas.nativeElement.appendChild(this.app.view);
    //
    //     this.update();
    // }

    // private async update() {
    //     this.createViewport();
    //     requestAnimationFrame(() => this.update());
    // }

    // private async createViewport() {
    //     this.viewport = new Viewport({ events: this.app.renderer.events })
    //
    //     this.viewport
    //         .drag()
    //         .pinch()
    //         .wheel()
    //         .decelerate();
    //
    //     this.app.stage.addChild(this.viewport);
    // }


}
