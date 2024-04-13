import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DotFormComponent } from '../dot-form/dot-form.component';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'lifeline-right-panel',
    standalone: true,
    imports: [ButtonModule, DotFormComponent, CommonModule, DialogModule],
    templateUrl: './right-panel.component.html',
    styleUrl: './right-panel.component.scss',
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
export class RightPanelComponent {


    stateSubscription!: Subscription;
    rightPanelOpen!: boolean;

    constructor(public lifelineService: LifelineStateService) { }

    ngOnInit() {
        this.stateSubscription = this.lifelineService.rightPanelOpen$.subscribe((isOpen: boolean) => {
            this.rightPanelOpen = isOpen;
        });
    }

    ngOnDestroy() {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    }

    onHide() {
        console.log("Hide right panel")
        this.lifelineService.setRightPanel(false);
    }

    onShow() {
        this.lifelineService.setRightPanel(true);
    }
}
