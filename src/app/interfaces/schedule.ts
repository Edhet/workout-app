import ExerciseInfo from "./exerciseInfo";
import ScheduleExercise from "./scheduleExercise";

export default interface Schedule {
  days: Array<string>,
  exercises: Array<ScheduleExercise>,
  name: string,
  firestoreID?: string,

}
