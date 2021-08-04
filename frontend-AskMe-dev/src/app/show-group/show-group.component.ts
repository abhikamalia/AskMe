import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnswers, IGroupData, IThread } from 'src/scripts/interface';
import { getUser } from 'src/scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.css']
})
export class ShowGroupComponent {
  loggedUser: string = '';
  loggedUsername: string | undefined = '';
  groupName: string = '';
  groupData: IGroupData = {
    name: '',
    admin: '',
    description: '',
    createdAt: '',
  };
  threadData: IThread[] = [];
  constructor(
    private router: Router,
    private communicationService: ComponentCommunicationService,
    private route: ActivatedRoute,
    private CRUD: CRUDService
  ) {}

  ngOnInit(): void {
    this.checkAuth();
    this.checkUser();
    this.route.params.subscribe((params) => {
      this.groupName = params.name;
      // this.CRUD.getGroupInfo(this.groupName).subscribe((data) => {
      //   this.groupData = data

      // })
      this.getGroupData(this.groupName)
      this.getGroupAllThreads(this.groupName)
      
    });
    this.communicationService.threadCreated.subscribe(() => {
      this.getGroupAllThreads(this.groupName)
    })
  }

  checkAuth = () => {
    const user = getUser();
    if (user === null) {
      this.router.navigate(['/auth']);
    }
  };

  checkUser = () => {
    const user = getUser();
    if (user === null) {
      this.loggedUser = '';
      this.loggedUsername = '';
    } else {
      this.loggedUser = user.userData.email;
      this.loggedUsername = user.userData.username;
    }
  };

  changeValueOfThreadInGroup = () => {
    this.communicationService.raiseThreadInGroup(true);
  };

  getGroupData = (name: string) => {
    this.CRUD.getGroupInfo(name).subscribe((data) => {
      this.groupData = data
    })
  };
  
  getAnswerLength = (thread: IThread) => {
    if(thread.answers){
      return thread.answers?.length
    }
    return 0
  }

  getThreadLatestReplyDate = (thread: IThread) => {
    if(thread.answers.length === 0){
      return "No replies yet"
    }
    const answersLength =  thread.answers.length
    return thread.answers[answersLength - 1].answeredDate
    
  }

  getGroupAllThreads = (name: string) => {
    this.CRUD.getAllThreads(name).subscribe((data) => {
      this.threadData = data
    })
  }

  threadOpen = (thread: IThread ,  replies: number) => {
    this.communicationService.raiseThreadOpen(thread , this.groupName , replies)
  }

}

