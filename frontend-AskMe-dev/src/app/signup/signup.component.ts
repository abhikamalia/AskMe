import { Component, OnInit } from '@angular/core';
import { NORMAL_USER_TYPE } from 'src/scripts/constants';
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = ""
  password: string = ""
  confirmPassword: string = ""
  passwordType: string = "password"
  confirmPasswordType: string = "password"
  success: string = ""

  constructor(private CRUD: CRUDService) { }

  ngOnInit(): void {
  }
  changePasswordType = (type: string) => {
    if(type === "password"){
      if(this.passwordType === "password"){
        this.passwordType = "text"
      }else if(this.passwordType === "text"){
        this.passwordType = "password"
      }
    }else if(type === "confirmPassword")
      if(this.confirmPasswordType === "password"){
        this.confirmPasswordType = "text"
      }else if(this.confirmPasswordType === "text"){
        this.confirmPasswordType = "password"
      }
  }

  register = async () => {
    const userData = {
      email: this.email,
      password: this.password,
      firstName: "",
      lastName: "",
      userType: NORMAL_USER_TYPE
    }
    this.CRUD.addUser(userData).subscribe((data) => {
      console.log("another res: " , data)
      if(data.acknowledged){
        this.success = "User registered !"
      }
    })
  }
  
}
