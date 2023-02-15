import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import CategoryExercisesList from "../../interfaces/categoryExercisesList";
import {ExercisesService} from "../../services/exercises.service";

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {
  public categoryAndExercises: CategoryExercisesList = {categoryName: "", exercises: []};
  @Output() exerciseIDEmitter: EventEmitter<string> = new EventEmitter<string>();

  isLoading = true;

  constructor(private exercisesService: ExercisesService) { }

  async ngOnInit() {
    this.categoryAndExercises = await this.exercisesService.populateComponent();
    this.isLoading = false;
  }

  public emitExerciseID(id: string) {
    this.exerciseIDEmitter.emit(id);
  }
}
