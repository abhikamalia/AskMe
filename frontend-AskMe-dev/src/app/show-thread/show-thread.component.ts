import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAnswers, IThread } from 'src/scripts/interface';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-show-thread',
  templateUrl: './show-thread.component.html',
  styleUrls: ['./show-thread.component.css']
})
export class ShowThreadComponent  {
  thread: IThread = {
    _id: "",
    question: "",
    answers: [],
    group: "",
    questionByUser: ""  ,
    date: "",
  }
  groupName: string = ""
  replies: number = 0
  answers: IAnswers[] = []

  constructor(private communicationService: ComponentCommunicationService , private CRUD: CRUDService , private router: Router) { }

  ngOnInit(): void {
    this.communicationService.threadOpen.subscribe((data) => {
      this.thread = data.thread
      this.replies = data.replies
      this.answers = data.thread.answers
      this.groupName = data.groupName
    })
    this.communicationService.loggedOut.subscribe(() => {
      this.router.navigate(['/auth'])
    })
  }
  votes = (answer: IAnswers) => {
    return answer.upvote - answer.downvote
  }

  upvoteClicked = (answerId: string) => {
    
    this.answers.forEach((originalAnswer) => {
      if(originalAnswer.id === answerId && originalAnswer.voteClicked === false){
        originalAnswer.upvote += 1
        originalAnswer.voteClicked = true
        const answerIndex = this.answers.indexOf(originalAnswer)
        const threadId = this.thread._id as string
        this.CRUD.updateAnswer(this.answers , threadId , this.groupName).subscribe((data) => {
          console.log(data)
        })
        
      }
    })
  }

  downvoteClicked = (answerId: string) => {
    this.answers.forEach((originalAnswer) => {
      if(originalAnswer.id === answerId && originalAnswer.voteClicked === false){
        originalAnswer.downvote += 1
        originalAnswer.voteClicked = true
      }
    })
  }

}
