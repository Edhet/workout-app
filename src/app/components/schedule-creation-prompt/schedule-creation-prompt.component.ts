import {Component, EventEmitter, Output, Input} from '@angular/core';
import Schedule from "../../interfaces/schedule";

@Component({
  selector: 'app-schedule-creation-prompt',
  templateUrl: './schedule-creation-prompt.component.html',
  styleUrls: ['./schedule-creation-prompt.component.css']
})
export class ScheduleCreationPromptComponent {
  private readonly scheduleNameCharLimit = 24;
  public errorMessage = "";

  @Input() userSchedules: Array<Schedule> = [];

  public newSchedule: Schedule = {name: "", days: [], exercises: []};
  @Output() answer: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  public addDayBtn(day: string) {
    if (!this.newSchedule.days.includes(day)) {
      this.newSchedule.days.push(day);
      return;
    }
    this.newSchedule.days.forEach((dayOfWeek, index) => {
      if (dayOfWeek == day)
        this.newSchedule.days.splice(index, 1);
    });
  }

  public closePrompt() {
    this.errorMessage = "";
    this.newSchedule = {name: "", days: [], exercises: []};
    this.answer.emit(this.newSchedule);
  }

  public createSchedule() {
    this.errorMessage = "";
    this.userSchedules.forEach(schedule => this.errorMessage = (this.newSchedule.name = schedule.name) ? "There is already a schedule with this name" : "");
    if (this.newSchedule.days.length <= 0 )
      this.errorMessage = "New schedule has no assigned days";
    if (!this.newSchedule.name || this.newSchedule.name.length > this.scheduleNameCharLimit)
      this.errorMessage = (!this.newSchedule.name) ? "New schedule has no name" : "The schedule name is too big";
    if (this.errorMessage)
      return;
    this.answer.emit(this.newSchedule);
  }
}
