import { Injectable , EventEmitter } from '@angular/core';
import { IThread, IUserData } from 'src/scripts/interface';



@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  loggedIn: EventEmitter<IUserData>
  loggedOut: EventEmitter<string>
  createGroupModal: EventEmitter<string>
  groupCreated: EventEmitter<string>
  threadCreated: EventEmitter<string>
  threadInGroup: EventEmitter<boolean>
  threadOpen: EventEmitter<{ thread: IThread , groupName: string , replies: number }>

  constructor() { 
    this.loggedIn = new EventEmitter<IUserData>()
    this.loggedOut = new EventEmitter<string>()
    this.createGroupModal = new EventEmitter<string>()
    this.groupCreated = new EventEmitter<string>()
    this.threadCreated = new EventEmitter<string>()
    this.threadInGroup = new EventEmitter<boolean>()
    this.threadOpen = new EventEmitter<{ thread: IThread , groupName: string , replies: number }>()
  }

  raiseLoggedIn = (userData: IUserData) => {
    this.loggedIn.emit(userData)
  }

  raiseLoggedOut = () => {
    this.loggedOut.emit()
  }

  raiseCreateGroupModal = () => {
    this.createGroupModal.emit()
  }
  
  raiseGroupCreated = () => {
    this.groupCreated.emit()
  }

  raiseThreadInGroup = (value: boolean) => {
    this.threadInGroup.emit(value)
  }

  raiseThreadCreated = () => {
    this.threadCreated.emit()
  }
  raiseThreadOpen = (thread: IThread , groupName: string ,  replies: number) => {
    const tempObject = {
      thread,
      replies,
      groupName
    }
    this.threadOpen.emit(tempObject)
  }

}
