import { Injectable } from '@angular/core';
import { collection, getFirestore, addDoc, setDoc,getDocs } from 'firebase/firestore';
import { LoginService } from './auth-services/login.service';
@Injectable({
  providedIn: 'root'
})
export class FirestoreappsService {

  categories = [{name:"Breads & Omelettes",imageurl:"url('/assets/img1.jpg')"},
                {name:"Pizza\'s & Pasta\'s'",imageurl:"url('/assets/img2.jpg')"},
                {name:'Burgers & Fries',imageurl:"url('/assets/img3.jpg')"},
                {name:'Tea Coffee Mocktails',imageurl:"url('/assets/img4.jpg')"},
                {name:'Smoothies Desserts',imageurl:"url('/assets/img5.jpg')"}];

  private app:any
  private db:any
  constructor(private loginService:LoginService ) { 
    this.app = this.loginService.getFirebaseApp();
    this.db = getFirestore(this.app)
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
