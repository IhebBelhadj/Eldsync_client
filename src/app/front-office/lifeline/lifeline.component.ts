import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HudComponent } from './hud/hud.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AmbientBackgroundComponent } from './components/ambient-background/ambient-background.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { ToastModule } from 'primeng/toast';
import { AssetInspectComponent } from './components/asset-inspect/asset-inspect.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { LifelineStateService } from './state/lifeline-state.service';

@Component({
  selector: 'app-lifeline',
  standalone: true,
  imports: [HudComponent, CalendarComponent, AmbientBackgroundComponent, ConfirmPopupComponent, ContextMenuModule, ToastModule, AssetInspectComponent],
  templateUrl: './lifeline.component.html',
  styleUrl: './lifeline.component.scss'
})
export class LifelineComponent implements OnInit {

  contextOptions: MenuItem[] = [

    { label: 'Create dot', icon: 'pi pi-pencil', command: () => { this.toggleRightPanel() } },
  ];

  constructor(
    private layoutService: LayoutService,
    private lifelineStateService: LifelineStateService,
  ) {
    console.log(this.layoutService)
  }

  ngOnInit() {

  }


  toggleRightPanel() {
    console.log("Toggle right panel")
    const snapshot = this.lifelineStateService.snapshot;
    if (snapshot.rightPanelAction != 'add') {
      this.lifelineStateService.setRightPanelAction('add');
      this.lifelineStateService.setRightPanel(false);
    }
    this.lifelineStateService.setRightPanel(true); // Toggle right panel on
  }


}
