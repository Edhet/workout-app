import {Component, OnDestroy} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  emittedValue = "";

  constructor() { }

  ngOnDestroy() {
    this.emittedValue = "";
  }
}
