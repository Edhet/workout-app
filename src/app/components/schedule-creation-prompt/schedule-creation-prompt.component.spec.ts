import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCreationPromptComponent } from './schedule-creation-prompt.component';

describe('ScheduleCreationPromptComponent', () => {
  let component: ScheduleCreationPromptComponent;
  let fixture: ComponentFixture<ScheduleCreationPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCreationPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCreationPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
