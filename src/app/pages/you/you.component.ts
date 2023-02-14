import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-you',
  templateUrl: './you.component.html',
  styleUrls: ['./you.component.css']
})
export class YouComponent {
  public loadingSchedules = true;
}
