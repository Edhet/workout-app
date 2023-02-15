import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";
import {ExercisesService} from "../../services/exercises.service";
import Schedule from "../../interfaces/schedule";
import ExerciseInfo from "../../interfaces/exerciseInfo";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit, OnDestroy {
  public userSchedules: Array<Schedule> = [];

  public showCreationPrompt = false;
  public showDeletionPrompt = false;

  public scheduleIDtoDelete = "";

  @Output() loadEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public loadingSchedules = true;

  public newScheduleName = "";
  public daysOfWeek = new Array<string>;

  constructor(private schedulesService: SchedulesService, private exercisesService: ExercisesService) {}

  async ngOnInit() {
    await this.updateSchedulesAndExercises();
    this.loadingSchedules = false;
    this.update();
  }

  ngOnDestroy() {
    this.showCreationPrompt = false;
    this.showDeletionPrompt = false;
    this.closeCreationPrompt();
  }

  public addDayBtn(day: string) {
    if (!this.daysOfWeek.includes(day)) {
      this.daysOfWeek.push(day);
      return;
    }

    this.daysOfWeek.forEach((dayOfWeek, index) => {
      if (dayOfWeek == day)
        this.daysOfWeek.splice(index, 1);
    });
  }

  public async createScheduleBtn() {
    if (!this.newScheduleName || this.daysOfWeek.length <= 0)
      return;
    this.startLoading();
    let schedule: Schedule = {name: this.newScheduleName, days: this.daysOfWeek, exercises: []};
    this.closeCreationPrompt();
    await this.schedulesService.createNewSchedule(schedule);
    await this.updateSchedulesAndExercises();

    this.stopLoading();
  }

  public async deleteScheduleBtn(id: string) {
    this.showDeletionPrompt = true;
    this.scheduleIDtoDelete = id;
  }


  public async deleteSchedule() {
    this.showDeletionPrompt = false;
    this.startLoading();
    await this.schedulesService.deleteSchedule(this.scheduleIDtoDelete);
    await this.updateSchedulesAndExercises();
    this.stopLoading();
  }

  private async getExercisesInfo() {
    for (let i in this.userSchedules) {
      if (!this.userSchedules[i].exercises)
        continue;

      this.userSchedules[i].exercisesInfo = new Array<ExerciseInfo>();
      for (const id of this.userSchedules[i].exercises)
        this.userSchedules[i].exercisesInfo!.push(await this.exercisesService.getExercise(id));
    }
  }

  public async updateSchedulesAndExercises() {
    this.userSchedules = await this.schedulesService.getUserSchedules();
    await this.getExercisesInfo();
  }

  public openCreationPrompt() {
    this.showCreationPrompt = true;
  }

  public closeCreationPrompt() {
    this.showCreationPrompt = false;
    this.newScheduleName = "";
    this.daysOfWeek = new Array<string>;
  }

  private update() {
    this.loadEmitter.emit(this.loadingSchedules);
  }

  private startLoading() {
    this.loadingSchedules = true;
    this.update();
  }

  private stopLoading() {
    this.loadingSchedules = false;
    this.update();
  }
}
