import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import Phaser from 'phaser';

import { EventBus } from "./EventBus";

import { Boot } from './scenes/Boot';
import { GraphScene } from './scenes/Graph';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

@Component({
    selector: 'lifeline-graph',
    standalone: true,
    imports: [],
    templateUrl: './graph-display.component.html',
    styleUrl: './graph-display.component.scss'
})
export class GraphDisplayComponent implements OnInit {

    scene: Phaser.Scene;
    game: Phaser.Game;

    sceneCallback: (scene: Phaser.Scene) => void;
    parentElement: HTMLElement;

    config: Phaser.Types.Core.GameConfig = {
        type: AUTO,
        backgroundColor: '#028af8',
        scene: [
            Boot,
            Preloader,
            GraphScene,
        ]
    };

    constructor(private elementRef: ElementRef) { }

    StartGame(parent: string) {
        this.parentElement = this.elementRef.nativeElement.querySelector(`.${parent}`);

        return new Game({
            ...this.config,
            width: this.parentElement ? this.parentElement.clientWidth : 1024,
            height: this.parentElement ? this.parentElement.clientHeight : 768,
            parent: this.parentElement
        });

    }


    ngOnInit() {
        this.game = this.StartGame('graph-container');
        console.log("game: ", this.game);

        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {

            this.scene = scene;

            if (this.sceneCallback) {

                this.sceneCallback(scene);

            }

        });
    }


    // Component unmounted
    ngOnDestroy() {

        if (this.game) {

            this.game.destroy(true);

        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.parentElement) {
            this.game.scale.resize(this.parentElement.clientWidth, this.parentElement.clientHeight);
        }
    }

}
