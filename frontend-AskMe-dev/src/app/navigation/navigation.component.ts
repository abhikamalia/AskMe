import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserData } from '../../scripts/interface';
import { getUser } from '../../scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  loggedUser: string = ""
  loggedUsername: string | undefined= ""
  userData: IUserData | undefined = {
    email: ""
  }
  constructor(private communicationService: ComponentCommunicationService , private CRUD: CRUDService , private router: Router) { }

  ngOnInit(): void {
    this.checkUser()
    this.communicationService.loggedIn.subscribe((data) => {
      this.loggedUser = data.email
      this.loggedUsername = data.username
      this.userData = data
    })
    this.communicationService.loggedOut.subscribe(() => {
      this.checkUser()
    })
  }
  checkUser =  () => {
    const user =  getUser()
    if(user === null){
      this.loggedUser = ""
      this.userData = undefined
    }else {
      this.loggedUser = user.userData.email
      this.loggedUsername = user.userData.username
      this.userData = user.userData
    }
  }

  logout = () => {
    localStorage.removeItem("user")
    this.checkUser()
    this.communicationService.raiseLoggedOut()
  }

  // openCreateGroupModal = () => {
  //   this.communicationService.raiseCreateGroupModal()
  // }

}
