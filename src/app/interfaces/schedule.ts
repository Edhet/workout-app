import ExerciseInfo from "./exerciseInfo";

export default interface Schedule {
  days: Array<string>,
  exercises: Array<string>,
  name: string,
  firestoreID?: string,
  exercisesInfo?: Array<ExerciseInfo>

}
