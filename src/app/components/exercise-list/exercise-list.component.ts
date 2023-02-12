import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import ExerciseInfo from "../../interfaces/exerciseInfo";
import {ExercisesService} from "../../services/exercises.service";
import CategoryExercisesList from "../../interfaces/categoryExercisesList";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  @ViewChild('listContainer') div!:ElementRef;

  isHiddenClass: string = "";
  hasPaddingClass: string = "";

  public categoryAndExercises: CategoryExercisesList = {categoryName: "", exercises: []};

  constructor(private exercisesService: ExercisesService) { }

  async ngOnInit() {
    this.categoryAndExercises = await this.exercisesService.populateComponent();
    setTimeout(() => this.onWindowResize(), 50);
  }

  onWindowResize() {
    if (this.div.nativeElement.scrollWidth > this.div.nativeElement.clientWidth) {
      this.isHiddenClass = "";
      this.hasPaddingClass = "pr-[16.666667%]";
    }
    else {
      this.isHiddenClass = "hidden";
      this.hasPaddingClass = "";
    }
  }
}
