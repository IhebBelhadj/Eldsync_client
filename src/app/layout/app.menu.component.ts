
import { OnInit, Renderer2 } from '@angular/core';
import { Component } from '@angular/core';



import { LayoutService } from './service/app.layout.service';
import { AppConfigComponent } from "./config/app.config.component";
import { AppMenuitemComponent } from "./app.menuitem.component";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public appConfigComponent: AppConfigComponent, public layoutService: LayoutService, private renderer: Renderer2) { }

  ngOnInit() {
    this.model = [
      {
        label: '',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Form Layo', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/medicaments'] },
          { label: 'Medication', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/medication'] },
          { label: 'Calendar', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/medication/calendarMedication'] },
          { label: 'Task', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/task'] },
          { label: 'Lifeline', icon: 'fa-solid fa-heart-pulse', routerLink: ['/lifeline/lifeline'] }




        ]
      }
    ];


  }
  onLifePulseClick() {
    this.layoutService.hideMenu();
    this.appConfigComponent.hideConfigButton();

    console.log('element is present');

  }


  onItemClick() {
    this.showConfigButton();

  }
  showConfigButton() {
    document.querySelector('.layout-config-button')?.classList.remove('hidden');
  }

  hideConfigButton() {
    document.querySelector('.layout-config-button')?.classList.add('hidden');
  }


}
