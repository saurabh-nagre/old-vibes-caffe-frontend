import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { getDoc ,doc} from 'firebase/firestore';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  contact:number = 0
  logoURL = "/assets/logo.png";
  loginForm = this.formBuilder.group({
    email:[''],
    password:[''],
  })
  
  constructor(
    private formBuilder : FormBuilder,
    private router:Router,
    private loginService:LoginService,
    private dbservice:FirestoreappsService
  ) {}
  async ngOnInit(): Promise<void> {
      await getDoc(doc(this.dbservice.getDatabase(),'ownerDetails/contact')).then((value)=>{
          this.contact = value.get('contact')
      })
  }
  
  
  onSubmit(){
    const email = this.loginForm.controls['email'];
    const password = this.loginForm.controls['password'];

    this.loginService.signinWithEmailPass(email.value, password.value).then((value)=>{
      if(value){  
        this.router.navigate(["/dashboard"],{replaceUrl:true});
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
