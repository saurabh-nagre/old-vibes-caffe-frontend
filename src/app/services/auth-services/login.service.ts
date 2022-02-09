import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private app:any
  private user!:User;
  private auth!:Auth;
  private firebaseConfig = {
    apiKey: "AIzaSyA-d67oIXZXuuQeM_kM0gWXjUNi51haGCs",
    authDomain: "oldvibescaffe.firebaseapp.com",
    projectId: "oldvibescaffe",
    storageBucket: "oldvibescaffe.appspot.com",
    messagingSenderId: "103711601789",
    appId: "1:103711601789:web:8e66066e603bb9fbc42d14",
    measurementId: "G-NJNQLF5PY9"
  }

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
  }

  getFirebaseApp(){
    return this.app;
  }

  async signinWithEmailPass(email:string,password:string){

    await signInWithEmailAndPassword(this.auth,email , password)
      .then((userCredential) => {
        this.user = userCredential.user; 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    
      
    return this.user; 
  }

  getUser(){
    return this.user
  }
}
