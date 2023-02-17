import ExerciseInfo from "./exerciseInfo";

export default interface ScheduleExercise {
  exerciseID: string,
  series: number,
  repetitions: number,
  exercisesInfo?: ExerciseInfo

}
