import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../component-communication.service';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide: boolean = false;
  passwordType: string = 'password';
  email: string = '';
  password: string = '';
  constructor(
    private CRUD: CRUDService,
    private router: Router,
    private communicationService: ComponentCommunicationService
  ) {}

  ngOnInit(): void {}

  changePasswordType = () => {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else if (this.passwordType === 'text') {
      this.passwordType = 'password';
    }
  };

  login = () => {
    const userData = { email: this.email, password: this.password };
    this.CRUD.loginUser(userData).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.communicationService.raiseLoggedIn(data.userData)
      this.router.navigate(['/']);
    });
  };
}
