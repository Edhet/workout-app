import {Injectable} from '@angular/core';
import {addDoc, collection, doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import Schedule from "../interfaces/schedule";
import UserInfo from "../interfaces/userInfo";

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private readonly schedulesCollectionName = "schedules";
  private readonly userInfoCollectionName = "userInfo";


  constructor(private firestore: Firestore, private authService: AuthService) { }

  private getUserInfoDoc(uid: string) {
    return doc(this.firestore, this.userInfoCollectionName, uid);
  }

  private getUserInfoCollection() {
    return collection(this.firestore, this.userInfoCollectionName);
  }

  private getDocument(id: string) {
    return doc(this.firestore, this.schedulesCollectionName, id);
  }

  private getCollection() {
    return collection(this.firestore, this.schedulesCollectionName);
  }

  private async createUserInfoDoc() {
    const userUID = this.authService.getCurrentUser()?.uid;
    if (!userUID)
      return;
    await setDoc(doc(this.getUserInfoCollection(), userUID), {schedulesID: []});
  }

  private async getUserInfo(): Promise<UserInfo> {
    const userUID = this.authService.getCurrentUser()?.uid;
    if (!userUID)
      return Promise.reject();

    let userInfoDoc = await getDoc(this.getUserInfoDoc(userUID));
    if (!userInfoDoc.exists())
      await this.createUserInfoDoc();
    return userInfoDoc.data() as UserInfo;
  }

  public async getUserSchedules(): Promise<Array<Schedule>> {
    const userInfo = await this.getUserInfo();
    let schedules: Array<Schedule> = [];
    for (let i = 0; i < userInfo.schedulesID.length; i++)
      schedules.push(await this.getSchedule(userInfo.schedulesID[i]));
    return schedules;
  }

  public async createNewSchedule(schedule: Schedule) {
    if (!schedule)
      return;
    return await addDoc(this.getCollection(), schedule);
  }

  public async updateSchedule(newSchedule: Schedule, scheduleId: string) {
    if (!newSchedule)
      return;
    return await updateDoc(this.getDocument(scheduleId), {days: newSchedule.days, exercises: newSchedule.exercises, name: newSchedule.name});
  }

  public async getSchedule(id: string): Promise<Schedule> {
    const document = await getDoc(this.getDocument(id));
    if (!document.exists())
      return Promise.reject();
    let schedule: Schedule = document.data() as Schedule;
    return Promise.resolve(schedule);
  }
}
