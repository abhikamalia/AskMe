import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from 'src/scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  loggedUser: string = ""
  loggedUsername: string | undefined = ""
  groupName: string = ""
  groupDescription: string = ""
  constructor(private communicationService: ComponentCommunicationService , private CRUD: CRUDService , private router: Router) { }

  ngOnInit(): void {
    this.checkAuth()

  }

  checkAuth = () => {
    const user = getUser()
    if(user === null){
      this.router.navigate(["/auth"])
    }
    this.loggedUser = user.userData.email
    this.loggedUsername = user.userData.username
  }
  
  createGroup = () => {
    const dateArray = new Date().toISOString().split('T');
    const groupData = {
      admin: this.loggedUsername as string,
      name: this.groupName,
      description: this.groupDescription,
      createdAt: dateArray[0]
    }
    this.CRUD.addUserGroup(groupData , this.loggedUsername as string).subscribe((data) => {
      console.log(data)
      // this.router.navigate([`/`])
      this.communicationService.raiseGroupCreated()
    })
  }

}
