import { Component, Input, OnInit } from '@angular/core';
import { IGroupData, IThread } from 'src/scripts/interface';
import { getUser } from 'src/scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent  {
  @Input() groupName: string = ''

  threadInGroup: boolean = false
  loggedUser: string = ""
  loggedUsername: string | undefined = ""
  groupData: IGroupData[] = []
  group: string = ""
  question: string = ""
  upvote: number = 0
  downvote: number = 0
  constructor(private communicationService: ComponentCommunicationService , private CRUD: CRUDService) { }

  ngOnInit(): void {
    this.checkUser()
    this.getAllUserGroups()
    this.communicationService.groupCreated.subscribe((data) => {
      this.getAllUserGroups()
    })
    this.communicationService.threadInGroup.subscribe((value) => {
      this.threadInGroup = value 
    })
    
    
  }

  checkUser =  () => {
    const user =  getUser()
    if(user === null){
      this.loggedUser = ""
      this.loggedUsername = ""  
    }else {
      this.loggedUser = user.userData.email
      this.loggedUsername = user.userData.username
      
    }
  }

  getAllUserGroups = () => {
    this.CRUD.getUserAllGroups(this.loggedUsername as string).subscribe((data) => {
      this.groupData = data
      console.log(data)
    })
  }

  createNewThread = () => {
    const dateArray = new Date().toISOString().split('T');
    
    if(this.group === ''){
      const threadData: IThread = {
        question: this.question,
        answers: [],
        group: this.groupName,
        questionByUser: this.loggedUsername as string,
        date: dateArray[0],

      }
      this.CRUD.createThread(threadData , this.groupName).subscribe((data) => {
        console.log(data)
        this.communicationService.raiseThreadCreated()
      })
    }else{
      const threadData: IThread = {
        
        question: this.question,
        answers: [],
        group: this.group,
        questionByUser: this.loggedUsername as string,
        date: dateArray[0],
      }
      this.CRUD.createThread(threadData , this.group).subscribe((data) => {
        console.log(data)
        this.communicationService.raiseThreadCreated()
      })
    }
   
  }

}
