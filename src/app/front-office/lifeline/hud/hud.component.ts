import { Component } from '@angular/core';
import { DockerComponent } from '../components/docker/docker.component';
import { FilterCollectionComponent } from '../components/filter-collection/filter-collection.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';

@Component({
    selector: 'lifeline-hud',
    standalone: true,
    imports: [DockerComponent, FilterCollectionComponent, RightPanelComponent],
    templateUrl: './hud.component.html',
    styleUrl: './hud.component.scss'
})
export class HudComponent {

}
