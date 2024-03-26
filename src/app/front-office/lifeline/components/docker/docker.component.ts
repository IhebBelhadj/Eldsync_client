import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'lifeline-docker',
    standalone: true,
    imports: [CardModule, ButtonModule, TooltipModule],
    templateUrl: './docker.component.html',
    styleUrl: './docker.component.scss'
})
export class DockerComponent {

}
