import {Component, EventEmitter, Output} from '@angular/core';
import Schedule from "../../interfaces/schedule";

@Component({
  selector: 'app-schedule-creation-prompt',
  templateUrl: './schedule-creation-prompt.component.html',
  styleUrls: ['./schedule-creation-prompt.component.css']
})
export class ScheduleCreationPromptComponent {
  public errorMessage = "";

  public schedule: Schedule = {name: "", days: [], exercises: []};

  @Output() answer: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  public addDayBtn(day: string) {
    if (!this.schedule.days.includes(day)) {
      this.schedule.days.push(day);
      return;
    }
    this.schedule.days.forEach((dayOfWeek, index) => {
      if (dayOfWeek == day)
        this.schedule.days.splice(index, 1);
    });
  }

  public closePrompt() {
    this.errorMessage = "";
    this.schedule = {name: "", days: [], exercises: []};
    this.answer.emit(this.schedule);
  }

  public createSchedule() {
    if (!this.schedule.name || this.schedule.days.length <= 0) {
      this.errorMessage = (!this.schedule.name) ? "New schedule has no name" : "New schedule has no assigned days";
      return;
    }
    this.answer.emit(this.schedule);
  }
}
