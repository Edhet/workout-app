import {Injectable} from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
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

  private getUserInfoCol() {
    return collection(this.firestore, this.userInfoCollectionName);
  }

  private getScheduleDoc(id: string) {
    return doc(this.firestore, this.schedulesCollectionName, id);
  }

  private getScheduleCol() {
    return collection(this.firestore, this.schedulesCollectionName);
  }

  private async createUserInfoDoc() {
    const userUID = this.authService.getCurrentUser()?.uid;
    if (!userUID)
      return;
    await setDoc(doc(this.getUserInfoCol(), userUID), {schedulesID: []});
  }

  public async updateUserInfo(newUserInfo: UserInfo, userUID: string) {
    if (!newUserInfo)
      return;
    return await updateDoc(this.getUserInfoDoc(userUID), {schedulesID: newUserInfo.schedulesID});
  }

  public async getUserInfo(): Promise<UserInfo> {
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
    const userUID = this.authService.getCurrentUser()?.uid;
    if (!schedule || !userUID)
      return;
    const newScheduleRef = await addDoc(this.getScheduleCol(), schedule);
    let userInfo = await this.getUserInfo();
    userInfo.schedulesID.push(newScheduleRef.id);
    await this.updateUserInfo(userInfo, userUID);
    return newScheduleRef;
  }

  public async deleteSchedule(scheduleId: string) {
    const userUID = this.authService.getCurrentUser()?.uid;
    if (!scheduleId || !userUID)
      return
    let userInfo = await this.getUserInfo();
    userInfo.schedulesID.forEach((id, index) => {
      if (id == scheduleId)
        userInfo.schedulesID.splice(index, 1);
    })
    await this.updateUserInfo(userInfo, userUID);
    return deleteDoc(this.getScheduleDoc(scheduleId));
  }

  public async updateSchedule(newSchedule: Schedule, scheduleId: string) {
    if (!newSchedule)
      return;
    return await updateDoc(this.getScheduleDoc(scheduleId), {days: newSchedule.days, exercises: newSchedule.exercises, name: newSchedule.name});
  }

  public async getSchedule(id: string): Promise<Schedule> {
    const document = await getDoc(this.getScheduleDoc(id));
    if (!document.exists())
      return Promise.reject();
    let schedule: Schedule = document.data() as Schedule;
    schedule.firestoreID = document.id;
    return Promise.resolve(schedule);
  }
}
