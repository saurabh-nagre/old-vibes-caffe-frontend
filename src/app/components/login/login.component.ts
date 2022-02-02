import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/auth-services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  logoURL = "/assets/logo.png";
  loginForm = this.formBuilder.group({
    email:[''],
    password:[''],
  })
  
  constructor(
    private formBuilder : FormBuilder,
    private router:Router,
    private loginService:LoginService
  ) {}
  
  
  onSubmit(){
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];

    this.loginService.signinWithEmailPass(email.value, password.value).then((value)=>{
      if(value){  
        this.router.navigate(["/dashboard"]);
        this.loginForm.reset();
        // const navigationExtras:NavigationExtras = {
          //   queryParams:{
          //     currentUser: user,
          //   },
          // }       
      }
      else{
        alert('Login Failed');
        this.loginForm.controls['password'].setValue('')
      }
    })

  }
  
    
}
