import { Component, OnInit } from '@angular/core';
import { getUser } from '../../scripts/utils';
import { IGroupData } from '../../scripts/interface';
import { CRUDService } from '../crud.service';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent {

  loggedUser: string = ""
  loggedUsername: string | undefined = ""
  groupData: IGroupData[] = []
  constructor(private CRUD: CRUDService , private communicationService: ComponentCommunicationService) { }

  ngOnInit(): void {
    this.checkUser()
    this.getAllUserGroups()
    this.communicationService.groupCreated.subscribe((data) => {
      this.getAllUserGroups()
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

  

  getGroupMembersLength = (group: IGroupData) => {
    const memberLength: number = parseInt(group.members?.length + '') + 1
    return memberLength
  }

  getAllUserGroups = () => {
    this.CRUD.getUserAllGroups(this.loggedUsername as string).subscribe((data) => {
      this.groupData = data
      
    })
  }

}
