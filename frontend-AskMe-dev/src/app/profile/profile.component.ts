import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  IGroupData, IUserData } from '../../scripts/interface';
import { getUser } from '../../scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  loggedUser: string = ""
  loggedUsername: string | undefined = ""
  userData: IUserData = {
    email: "",
  }
  adminGroupsLength: number = 0
  allGroupsLength: number = 0
  constructor(private router: Router , private communicationService: ComponentCommunicationService , private CRUD: CRUDService) { }

  ngOnInit(): void {
    this.checkAuth()
    this.communicationService.loggedIn.subscribe((userData) => {
      this.loggedUser = userData.email
      this.loggedUsername = userData.username
      this.userData = userData
    })
    this.getAllUserGroupsLength()
    this.getAdminGroupsLength()
    
    this.communicationService.loggedOut.subscribe(() => {
      this.checkAuth()
    })
  }
  // Check User Data Exist
  checkAuth = () => {
    const user = getUser()
    if(user === null){
      this.router.navigate(["/auth"])
    }
    this.loggedUser = user.userData.email
    this.loggedUsername = user.userData.username
    this.userData = user.userData
  }

  // For All group
  getAllUserGroupsLength = () => {
    this.CRUD.getUserAllGroups(this.loggedUsername as string).subscribe((data) => {
      this.allGroupsLength = data.length
      
    })
  }
 
  //for Admin groups
  getAdminGroupsLength = () => {
    this.CRUD.getUserGroups(this.loggedUsername as string).subscribe((data) => {
      this.adminGroupsLength = data.length
      
    })
  }
}

