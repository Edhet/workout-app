import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
  isLoading = true;

  public categoryAndExercises: CategoryExercisesList = {categoryName: "", exercises: []};
  @Output() exerciseIDEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private exercisesService: ExercisesService) { }

  async ngOnInit() {
    this.categoryAndExercises = await this.exercisesService.populateComponent();
    this.isLoading = false;
    setTimeout(() => this.onWindowResize(), 50);
  }

  public emitExerciseID(id: string) {
    this.exerciseIDEmitter.emit(id);
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
