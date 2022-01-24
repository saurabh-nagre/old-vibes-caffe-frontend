import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {app} from "src/firabaseapp";
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
 
  constructor(
    private formBuilder : FormBuilder
  ) {}
  
  
  onSubmit():void{
    
    const auth = getAuth();
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];

    if(email!=null && password!=null){
      signInWithEmailAndPassword(auth,email.value , password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login Successfull");

        this.loginForm.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("login failed");
      });

      }
    }
    
}
