import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { FastTravelComponent } from '../fast-travel/fast-travel.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
    selector: 'lifeline-docker',
    standalone: true,
    imports: [CardModule, ButtonModule, TooltipModule, FastTravelComponent, FilterPanelComponent, SettingsComponent],
    templateUrl: './docker.component.html',
    styleUrl: './docker.component.scss'
})
export class DockerComponent {

    fastTravelBtnEvent!: Event;
    filterPanelBtnEvent!: Event;

    constructor(private lifelineStateService: LifelineStateService) { }

    toggleRightPanel() {
        console.log("Toggle right panel")
        this.lifelineStateService.toggleRightPanel(); // Toggle right panel on
    }
    toggleFastTravel($event: Event) {
        console.log("Toggle fast travel")
        this.fastTravelBtnEvent = $event;
        console.log($event)
        this.lifelineStateService.toggleFastTravel(); // Toggle fast travel on
    }
    toggleFiltersPanel($event: Event) {
        console.log("Toggle filter panel")
        this.filterPanelBtnEvent = $event;
        this.lifelineStateService.toggleFilterPanel(); // Toggle filter panel on
    }

    toggleSettingsPanel() {
        console.log("Toggle settings panel")
        this.lifelineStateService.toggleSettingsPanel(); // Toggle settings panel on
    }
}
