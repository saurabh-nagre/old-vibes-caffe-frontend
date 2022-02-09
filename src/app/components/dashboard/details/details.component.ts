import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { updatePassword, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  email:string = ''
  contact :any
  user!:User
  loginform = this.formBuilder.group({
    password :['']
  })
  detailsform = this.formBuilder.group({
    address:[''],contact:['']
  })
  constructor(private formBuilder : FormBuilder,
      private loginService:LoginService,private router:Router,
      private firestoreapp:FirestoreappsService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    if(this.user!=null && this.user.email){
      this.email = this.user.email;
    }
    else{
      this.router.navigate(['login']);
    }

  }

  onSubmit(){
    let newpassword = this.loginform.controls['password'].value
    if(newpassword!=''){
      updatePassword(this.user,newpassword).then(()=>{
        alert('Password Successfully changed!');
      }).catch((error)=>{
        alert('Password can\'t change now, Try again letter!')
      })
      this.loginform.controls['password'].setValue('')
    }
  }
  async submitContact(){
      let db  =this.firestoreapp.getDatabase()
      await setDoc(doc(db,'ownerDetails/contact'),{'contact':this.contact}).then(()=>{
        alert('Contact Saved Successfully!');
      }).catch((error)=>{
        alert('Contact can\'t change now, Try again letter!')
      })
  }
}
