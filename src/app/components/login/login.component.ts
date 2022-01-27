import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { FormBuilder, NgModel, Validators } from '@angular/forms';
import {app} from "src/firabaseapp";
import { NavigationExtras, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  logoURL = "/assets/logo.png";
  appInitialiser = app;
  loginForm = this.formBuilder.group({
    email:[''],
    password:[''],
  })
  user!:User;
  constructor(
    private formBuilder : FormBuilder,
    private router:Router,
  ) {}
  
  
  onSubmit():void{
    
    const auth = getAuth();
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];

    if(email!=null && password!=null){
      signInWithEmailAndPassword(auth,email.value , password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        
        const navigationExtras:NavigationExtras = {
          queryParams:{
            currentUser: user,
          },
        }
        
        this.router.navigate(["/dashboard"],navigationExtras);
        this.loginForm.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.loginForm.controls['password'].setValue('');
        alert("login failed");

      });

      }
    }
    
}
