import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from '../../scripts/utils';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  createGroupModal: boolean = false
  constructor(private router: Router , private communicationService: ComponentCommunicationService) { }

  ngOnInit(): void {
    this.checkAuth()
    this.communicationService.loggedOut.subscribe(() => {
      this.checkAuth()
    })
    this.communicationService.createGroupModal.subscribe(() => {
      this.createGroupModal = !this.createGroupModal
    })
  }

  checkAuth = () => {
    const user = getUser()
    if(user === null){
      this.router.navigate(["/auth"])
    }
  }

}
