import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc, setDoc,getDocs } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreappsService {

  categories = ["Breads & Omelettes",'Pizza\'s & Pasta\'s','Burgers & Fries','Tea Coffee Mocktails','Smoothies Desserts'];

  private firebaseConfig = {
    apiKey: "AIzaSyA-d67oIXZXuuQeM_kM0gWXjUNi51haGCs",
    authDomain: "oldvibescaffe.firebaseapp.com",
    projectId: "oldvibescaffe",
    storageBucket: "oldvibescaffe.appspot.com",
    messagingSenderId: "103711601789",
    appId: "1:103711601789:web:8e66066e603bb9fbc42d14",
    measurementId: "G-NJNQLF5PY9"
  }
  private app:any
  private db:any
  constructor( ) { 
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore()
  }
  
  getDatabase(){
    return this.db;
  }
  getCategories(){
    return this.categories;
  }

  async getBreadsOmelettes() {
  
      var requestedData:{id:string,name:string,price:number,category:string}[] = []
      try{
        const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/breadsomelettes"));
        querySnapshot.forEach((doc) => {
          let obj = {
            id:doc.id,
            name:doc.data()['name'],
            price:doc.data()['price'],
            category:'breadsomelettes'
          };
          requestedData.push(obj)
        });
      }
      catch(e){
        console.log(e);
      }
      return requestedData;    
  }

  async getPizzasPastas(){
    var requestedData:{id:string,name:string,price:number,category:string}[] = []
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/pizzaspastas"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          category:'pizzaspastas'
        };
        requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async getBurgersFries(){
    var requestedData:{id:string,name:string,price:number,category:string}[]  =[]
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/bergersfries"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          category:'bergersfries'
        };
        requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async getTeasCoffeesMocktails(){
    var requestedData:{id:string,name:string,price:number,category:string}[] = []
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/teascoffeesmocktails"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          category:'teascoffeesmocktails'
        };
        requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async getSmoothiesDesserts(){
    var requestedData:{id:string,name:string,price:number,category:string}[] = []
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/smoothiesdesserts"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          category:'smoothiesdesserts'
        };
        requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }


  async addItemtoBreadsOmellettes(Name:string,Price:number){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/breadsomelettes');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        category:this.categories[0]
      })
    }
    catch(e){
      console.log(e)
    }
  }
  
  async addItemtoPizzasPastas(Name:string,Price:number){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/pizzaspastas');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        category:this.categories[1]
      })
    }
    catch(e){
      console.log(e)
    }
  }
  async addItemtoBergersFries(Name:string,Price:number){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/bergersfries');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        category:this.categories[2]
      })
    }
    catch(e){
      console.log(e)
    }
  }
  async addItemtoTeasCoffeesMocktails(Name:string,Price:number){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/teascoffeesmocktails');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        category:this.categories[3]
      })
    }
    catch(e){
      console.log(e)
    }
  }
  async addItemtoSmoothiesDesserts(Name:string,Price:number){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/smoothiesdesserts');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        category:this.categories[4]
      })
    }
    catch(e){
      console.log(e)
    }
  }
}
