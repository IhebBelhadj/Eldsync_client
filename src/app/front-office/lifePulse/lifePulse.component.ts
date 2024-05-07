import {Component, OnInit} from '@angular/core';
import {SharedLifePulseService} from "../services/sharedLifePulse.service";


@Component({
  selector: 'app-lifePulse',
  templateUrl: './lifePulse.component.html',
  styleUrls: ['./lifePulse.component.scss']
})
export class LifePulseComponent implements OnInit{
  containerVisible: boolean = true;
  modifyCss: boolean = false;

  constructor(private sharedLifePulseService: SharedLifePulseService) {}
  inviteCode: string;
  showTopSectionBar: boolean = true;
  ngOnInit() {
    this.sharedLifePulseService.containerVisible$.subscribe(visible => {
      this.containerVisible = visible;
    });
    this.sharedLifePulseService.modifyCss$.subscribe(modify => {
      this.modifyCss = modify;
    });


  }
  handleMeasureTabClick() {
    // Toggle the visibility of the top-section-bar
    this.showTopSectionBar = true;
  }
  handleOtherTabClick() {
    // Set showTopSectionBar to true when other tabs are clicked
    this.showTopSectionBar = false;
  }

}
