import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SchedulesService} from "../../services/schedules.service";
import Schedule from "../../interfaces/schedule";
import {ExercisesService} from "../../services/exercises.service";

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  public readonly confirmationMessage = "Are you sure? These changes cannot be undone";
  public readonly scheduleNameCharLimit = 24;
  private readonly invalidChars = ['-', '+', 'e', 'E', '.'];

  private originalName = "";
  public scheduleID: string | null = null;
  public scheduleToEdit?: Schedule;
  private otherSchedules = new Array<Schedule>;

  public nameAlreadyInUse = false;
  public isLoading = true;
  public confirmationPromptOpen = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private schedulesService: SchedulesService, private exercisesService: ExercisesService) { }

  async ngOnInit() {
    this.scheduleID = this.activatedRoute.snapshot.paramMap.get("id");
    const userInfo = await this.schedulesService.getUserInfo();
    if (!this.scheduleID || !userInfo.schedulesID.includes(this.scheduleID))
      await this.router.navigate(["you"]);
    this.scheduleToEdit = await this.schedulesService.getSchedule(this.scheduleID!);
    this.originalName = this.scheduleToEdit.name;
    await this.getExercisesInfo();
    this.otherSchedules = await this.schedulesService.getUserSchedules(userInfo);
    this.isLoading = false;
  }

  private async getExercisesInfo() {
    for (const exercise of this.scheduleToEdit!.exercises)
      exercise.exercisesInfo = await this.exercisesService.getExercise(exercise.exerciseID);
  }

  public addDayBtn(day: string) {
    if (!this.scheduleToEdit!.days.includes(day)) {
      this.scheduleToEdit!.days.push(day);
      return;
    }
    this.scheduleToEdit!.days.forEach((dayOfWeek, index) => {
      if (dayOfWeek == day)
        this.scheduleToEdit!.days.splice(index, 1);
    });
  }

  public deleteExercise(id: string) {
    this.scheduleToEdit?.exercises.forEach((exercise, index) => {
      if (exercise.exerciseID == id) {
        this.scheduleToEdit?.exercises.splice(index, 1);
        return;
      }
    })
  }

  public checkNameUsage() {
    if (this.scheduleToEdit?.name == this.originalName)
      return;
    let inUse = false;
    this.otherSchedules.forEach(schedule => {
      if (schedule.name == this.scheduleToEdit?.name) {
        inUse = true;
        return;
      }
    });
    this.nameAlreadyInUse = inUse;
  }

  public openConfirmationPrompt() {
    if (!this.scheduleToEdit?.name || this.scheduleToEdit.days.length <= 0 || this.nameAlreadyInUse || this.scheduleToEdit.name.length > this.scheduleNameCharLimit)
      return;
    for (let exercise of this.scheduleToEdit.exercises)
      if (!exercise.series || !exercise.repetitions)
        return;
    this.confirmationPromptOpen = true;
  }

  public async getChangeConfirmation(answer: boolean) {
    if (!answer) {
      this.confirmationPromptOpen = false;
      return;
    }
    this.confirmationPromptOpen = false;
    this.scheduleToEdit?.exercises.forEach(exercises => delete exercises.exercisesInfo);
    await this.router.navigate(["you"]);
    await this.schedulesService.updateSchedule(this.scheduleToEdit!, this.scheduleID!);
  }

  public validNumber(event: KeyboardEvent) {
    if (this.invalidChars.includes(event.key))
      event.preventDefault();
  }
}
