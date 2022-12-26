import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, AfterViewInit {
  @ViewChild('listContainer') div!:ElementRef;
  isHiddenClass: string = "";
  hasPaddingClass: string = "";

  ngOnInit() {
    setTimeout(() => this.onWindowResize(), 100);
  }

  ngAfterViewInit() {
    setTimeout(() => this.onWindowResize(), 100);
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
