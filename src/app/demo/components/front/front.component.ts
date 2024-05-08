import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html',
    styleUrl: './front.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class FrontComponent {
    constructor( public router: Router) { }

}
