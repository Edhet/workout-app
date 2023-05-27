import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";
import Schedule from "../../interfaces/schedule";
import ScheduleExercise from "../../interfaces/scheduleExercise";

@Component({
  selector: 'app-selection-prompt',
  templateUrl: './selection-prompt.component.html',
  styleUrls: ['./selection-prompt.component.css']
})
export class SelectionPromptComponent implements OnInit, OnDestroy {
  private readonly invalidChars = ['-', '+', 'e', 'E', '.'];

  public userSchedules: Array<Schedule> = [];
  public isLoading = true;

  public selectedScheduleID = "";
  public errorMessage = "";

  @Input() emittedValue = "";
  @Output() closePromptEmitter: EventEmitter<string> = new EventEmitter<string>();

  public series: number = 1;
  public repetitions: number = 1;


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

    if (this.repetitions < 1 || this.series < 1) {
      this.errorMessage = (!this.series) ? "Insert a valid number of series" : "Insert a valid number of repetitions";
      return;
    }

    let newSchedule = await this.schedulesService.getSchedule(this.selectedScheduleID);
    for (const exercises of newSchedule.exercises)
      if (exercises.exerciseID == this.emittedValue) {
        this.errorMessage = "This exercise is already in this schedule"
        return;
      }

    this.isLoading = true;
    const newExercise: ScheduleExercise = {exerciseID: this.emittedValue, series: this.series, repetitions: this.repetitions};
    newSchedule.exercises.push(newExercise);
    await this.schedulesService.updateSchedule(newSchedule, this.selectedScheduleID);
    this.errorMessage = "";
    this.isLoading = false;
    this.closePrompt();
  }


  public changeSelectedSchedule(id: string) {
    this.selectedScheduleID = id;
  }

  public closePrompt() {
    this.closePromptEmitter.emit("");
  }

  public validNumber(event: KeyboardEvent) {
    if (this.invalidChars.includes(event.key))
      event.preventDefault();
  }
}
