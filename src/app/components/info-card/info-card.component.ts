import {Component, OnInit} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  userHasSchedules: boolean = false;
  isLoading = true;

  constructor(private schedulesService: SchedulesService) { }

  async ngOnInit() {
    const schedules = await this.schedulesService.getUserInfo()
    this.userHasSchedules = Boolean(schedules.schedulesID.length > 0);
    this.isLoading = false;
  }
}
