import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';
import { LifelineStateService } from '../../state/lifeline-state.service';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lifeline-asset-inspect',
  standalone: true,
  imports: [CommonModule, DialogModule, ImageModule, ButtonModule],
  templateUrl: './asset-inspect.component.html',
  styleUrl: './asset-inspect.component.scss'
})
export class AssetInspectComponent implements AfterViewInit {


  imageToInspect: string;
  inspectorVisible: boolean = false;

  set setInspectorVisible(value: boolean) {
    if (value) {
      this.onInspectorShow();
    }
    else {
      this.onInspectorHide();
    }
  }

  @ViewChild('inspector') inspector: Dialog;
  constructor(
    private lifelineState: LifelineStateService,
  ) { }

  onInspectorShow() {
    this.lifelineState.setInspector(true);
    this.imageToInspect = this.lifelineState.snapshot.imageToInspect;

  }

  onInspectorHide() {
    console.log("Hiding inspector")
    this.lifelineState.setInspector(false);
  }

  ngAfterViewInit(): void {
    console.log('asset inspector loaded')
    this.lifelineState.inspector$.subscribe((isOpen: boolean) => {
      console.log("Inspector is open", isOpen);
      if (this.inspector) {
        if (isOpen) {
          console.log("opening asset inspector")
          this.imageToInspect = this.lifelineState.snapshot.imageToInspect;
          this.inspectorVisible = true;
        } else {
          this.inspectorVisible = false
        }
      }
    });
  }



}
