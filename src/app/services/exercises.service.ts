import {Injectable, OnInit} from '@angular/core';
import {collection, doc, Firestore, getDoc, getDocs, limit, query} from "@angular/fire/firestore";
import ExerciseInfo from "../interfaces/exerciseInfo";
import CategoryExercisesList from "../interfaces/categoryExercisesList";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private readonly collectionName = "exercises";

  private static isPopulating = false;

  private allExercisesCache?: Array<ExerciseInfo>;
  private categoriesLeft: Array<string> = [];

  constructor(private firestore: Firestore) { }

  private getDocument(id: string) {
    return doc(this.firestore, this.collectionName, id);
  }

  private getCollection() {
    return collection(this.firestore, this.collectionName);
  }

  public async getExercise(id: string): Promise<ExerciseInfo> {
    const document = await getDoc(this.getDocument(id));
    if (!document.exists())
      return Promise.reject();
    let exercise: ExerciseInfo = document.data() as ExerciseInfo;
    exercise.firestoreID = document.id;
    return Promise.resolve(exercise);
  }

  public async getAllExercises(max?: number): Promise<Array<ExerciseInfo>> {
    const collection = (max && max > 0) ? await getDocs(query(this.getCollection(), limit(max))) : await getDocs(this.getCollection());
    let exerciseList: Array<ExerciseInfo> = [];
    collection.forEach(doc => {
      let exercise: ExerciseInfo = doc.data() as ExerciseInfo;
      exercise.firestoreID = doc.id;
      exerciseList.push(exercise);
    });
    return exerciseList;
  }

  public async getCategories(exerciseList?: Array<ExerciseInfo>): Promise<Array<string>> {
    if (!exerciseList)
      exerciseList = await this.getAllExercises();
    let categories: Array<string> = [];
    exerciseList.forEach(exercise => categories.push(exercise.category));
    categories = [...new Set(categories)];
    return categories;
  }

  public async getAllExercisesFromCategory(category: string, exerciseList?: Array<ExerciseInfo>): Promise<Array<ExerciseInfo>> {
    if (!exerciseList)
      exerciseList = await this.getAllExercises();
    let exercisesInCategory: Array<ExerciseInfo> = [];
    exerciseList.forEach(exercise => {
      if (exercise.category == category)
        exercisesInCategory.push(exercise);
    });
    return exercisesInCategory;
  }

  public async populateComponent(): Promise<CategoryExercisesList> {
    while (ExercisesService.isPopulating)
      await new Promise(resolve => setTimeout(resolve, 1))
    ExercisesService.isPopulating = true;

    if (!this.allExercisesCache) this.allExercisesCache = await this.getAllExercises();
    if (this.categoriesLeft.length == 0) this.categoriesLeft = await this.getCategories(this.allExercisesCache);

    const nextCategory = this.categoriesLeft.pop();

    ExercisesService.isPopulating = false;
    return {categoryName: nextCategory!, exercises: await this.getAllExercisesFromCategory(nextCategory!, this.allExercisesCache)};
  }
}
