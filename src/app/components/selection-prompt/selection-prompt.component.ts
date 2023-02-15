import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";
import Schedule from "../../interfaces/schedule";

@Component({
  selector: 'app-selection-prompt',
  templateUrl: './selection-prompt.component.html',
  styleUrls: ['./selection-prompt.component.css']
})
export class SelectionPromptComponent implements OnInit, OnDestroy {
  public userSchedules: Array<Schedule> = [];
  public isLoading = true;

  public selectedScheduleID = "";
  public errorMessage = "";

  @Input() emittedValue = "";
  @Output() closePromptEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private schedulesService: SchedulesService) { }

  async ngOnInit() {
    this.userSchedules = await this.schedulesService.getUserSchedules();
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.errorMessage = "";
  }

  public async addExerciseToSchedule() {
    if (!this.selectedScheduleID || !this.emittedValue) {
      this.errorMessage = "No schedule selected"
      return;
    }
    let newSchedule = await this.schedulesService.getSchedule(this.selectedScheduleID);
    for (const exercises of newSchedule.exercises)
      if (exercises == this.emittedValue) {
        this.errorMessage = "This exercise is already in this schedule"
        return;
      }
    newSchedule.exercises.push(this.emittedValue);
    await this.schedulesService.updateSchedule(newSchedule, this.selectedScheduleID);
    this.errorMessage = "";
    this.closePrompt();
  }

  public changeSelectedSchedule(id: string) {
    this.selectedScheduleID = id;
  }

  public closePrompt() {
    this.closePromptEmitter.emit("");
  }
}
