import {Component, OnInit} from '@angular/core';
import {SchedulesService} from "../../services/schedules.service";
import {ExercisesService} from "../../services/exercises.service";
import Schedule from "../../interfaces/schedule";
import ExerciseInfo from "../../interfaces/exerciseInfo";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  public userSchedules: Array<Schedule> = [];

  constructor(private schedulesService: SchedulesService, private exercisesService: ExercisesService) {}

  async ngOnInit() {
    this.userSchedules = await this.schedulesService.getUserSchedules();
    await this.getExercisesInfo();
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

  public async createSchedule() {
    let newSchedule: Schedule = {name: "test", exercises: [], days: []};
    await this.schedulesService.createNewSchedule(newSchedule);
  }
}
