import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import ExerciseInfo from "../../interfaces/exerciseInfo";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  @ViewChild('listContainer') div!:ElementRef;

  listItems?: Array<ExerciseInfo>;

  isHiddenClass: string = "";
  hasPaddingClass: string = "";

  ngOnInit() {
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
