import { Component, OnInit } from '@angular/core';
import { IGroupData, IUserData } from 'src/scripts/interface';
import { getUser } from '../../scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-your-groups',
  templateUrl: './your-groups.component.html',
  styleUrls: ['./your-groups.component.css']
})
export class YourGroupsComponent  {
  loggedUser: string = ""
  loggedUsername: string | undefined = ""
  groupData: IGroupData[] = []
  groupMembers: number = 0
  constructor(private CRUD: CRUDService , private communicationService: ComponentCommunicationService) { }

  ngOnInit(): void {
    this.checkUser()
    this.getAdminGroups()
    this.communicationService.groupCreated.subscribe(() => {
      this.getAdminGroups()
    })
  }

  checkUser =  () => {
    const user =  getUser()
    if(user === null){
      this.loggedUser = ""
      
    }else {
      this.loggedUser = user.userData.email
      this.loggedUsername = user.userData.username
      
    }
  }
  getAdminGroups = () => {
    this.CRUD.getUserGroups(this.loggedUsername as string).subscribe((data) => {
      this.groupData = data
      
    })
  }

  

  getGroupMembersLength = (group: IGroupData) => {
    const memberLength: number = parseInt(group.members?.length + '') + 1
    return memberLength
  }

}
