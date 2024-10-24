import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
    selector: 'lifeline-settings',
    standalone: true,
    imports: [DialogModule, CommonModule, ListboxModule, ButtonModule, ToggleButtonModule, FormsModule, InputSwitchModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {

    settingsPanelOpen: boolean = false;
    stateSubscription!: Subscription;
    settingsTabs: any[] = [
        { label: 'General', icon: 'pi pi-fw pi-cog' },
        { label: 'Account', icon: 'pi pi-fw pi-user' },

    ];
    selectedTab: any = this.settingsTabs[0];

    settings: any = {
        general: {
            //push notifications
            pushNotification: true,
            //email notifications
            emailNotification: true,
            //subscription newsletter
            subscriptionNewsletter: true,
        },
    }

    constructor(private lifelineService: LifelineStateService) { }

    ngOnInit() {
        this.stateSubscription = this.lifelineService.settingsPanelOpen$.subscribe((isOpen: boolean) => {
            this.settingsPanelOpen = isOpen;
        });
    }

    ngOnDestroy() {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
        }
    }

    onHide() {
        console.log("Hide settings panel")
        this.lifelineService.setSettingsPanel(false);
    }

    onShow() {
        this.lifelineService.setSettingsPanel(true);
    }


}
