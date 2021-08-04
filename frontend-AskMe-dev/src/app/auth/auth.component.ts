import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getUser } from '../../scripts/utils';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkAuth()
  }

  checkAuth = async () => {
    const user = await getUser()
    if(user && user.userData.email){
      this.router.navigate(["/"])
    }
  }

}
