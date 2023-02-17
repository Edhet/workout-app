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
  public readonly deletionMessage = "Do you really want to delete this schedule?"
  public scheduleIDtoDelete = "";

  public userSchedules: Array<Schedule> = [];

  public showCreationPrompt = false;
  public showDeletionPrompt = false;

  public loadingSchedules = true;
  @Output() loadEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private schedulesService: SchedulesService, private exercisesService: ExercisesService) {}

  async ngOnInit() {
    await this.updateSchedulesAndExercises();
    this.propagateLoad(false);
  }

  ngOnDestroy() {
    this.showCreationPrompt = false;
    this.showDeletionPrompt = false;
  }

  public async getCreationResponse(newSchedule: Schedule) {
    this.showCreationPrompt = false;
    if (!newSchedule.name)
      return;
    this.propagateLoad(true);
    await this.schedulesService.createNewSchedule(newSchedule);
    await this.updateSchedulesAndExercises();
    this.propagateLoad(false);
  }

  public async deleteSchedulePrompt(id: string) {
    this.showDeletionPrompt = true;
    this.scheduleIDtoDelete = id;
  }

  public async getDeletionResponse(confirmed: boolean) {
    if (confirmed)
      await this.deleteSchedule();
    else {
      this.showDeletionPrompt = false;
      this.scheduleIDtoDelete = '';
    }
  }

  public async deleteSchedule() {
    this.showDeletionPrompt = false;
    this.propagateLoad(true);
    await this.schedulesService.deleteSchedule(this.scheduleIDtoDelete);
    await this.updateSchedulesAndExercises();
    this.propagateLoad(false);
  }

  private async getExercisesInfo() {
    for (let i in this.userSchedules) {
      if (!this.userSchedules[i].exercises)
        continue;

      for (const exercise of this.userSchedules[i].exercises)
        exercise.exercisesInfo = await this.exercisesService.getExercise(exercise.exerciseID);
    }
  }

  private async updateSchedulesAndExercises() {
    this.userSchedules = await this.schedulesService.getUserSchedules();
    await this.getExercisesInfo();
  }

  private propagateLoad(isLoading: boolean) {
    this.loadingSchedules = isLoading;
    this.loadEmitter.emit(this.loadingSchedules);
  }
}
