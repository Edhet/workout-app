import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements AfterViewInit {
  @ViewChild('listContainer') div:ElementRef;
  isHiddenClass: string = "";
  hasPaddingClass: string = "";

  ngAfterViewInit() {
    this.onResize();
  }

  onResize() {
    const divNativeElement = this.div.nativeElement;
    if (!(divNativeElement.scrollWidth > divNativeElement.clientWidth)) {
      this.isHiddenClass = "hidden";
      this.hasPaddingClass = "";
    }
    else {
      this.isHiddenClass = "";
      this.hasPaddingClass = " pr-[16.666667%]";
    }
  }
}
