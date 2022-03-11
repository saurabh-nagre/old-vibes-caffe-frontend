import { Injectable } from '@angular/core';
import { collection, getFirestore, addDoc, setDoc,getDocs } from 'firebase/firestore';
import { LoginService } from './auth-services/login.service';
@Injectable({
  providedIn: 'root'
})
export class FirestoreappsService {

  categories = [{name:"Breads & Omelettes",imageurl:"/assets/img1.jpg"},
                {name:"Pizza\'s & Pasta\'s",imageurl:"/assets/img2.jpg"},
                {name:'Burgers & Fries',imageurl:"/assets/img3.jpg"},
                {name:'TeaCoffee Mocktails',imageurl:"/assets/img4.jpg"},
                {name:'Smoothies & Desserts',imageurl:"/assets/img5.jpg"}];
  
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
  
      var requestedData:{id:string,name:string,discount:number,price:number,category:string,subcategory:string}[] = []
      try{
        const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/breadsomelettes"));
        querySnapshot.forEach((doc) => {
          let obj = {
            id:doc.id,
            name:doc.data()['name'],
            price:doc.data()['price'],
            discount:doc.data()['discount'],
            category:'breadsomelettes',
            subcategory:doc.data()['subcategory']
          };
          if(!obj.discount){
            obj.discount = obj.price;
          }
          if(obj.id!='subcategory')
            requestedData.push(obj);
        });
      }
      catch(e){
        console.log(e);
      }
      return requestedData;    
  }

  async getPizzasPastas(){
    var requestedData:{id:string,name:string,discount:number,price:number,category:string,subcategory:string}[] = []
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/pizzaspastas"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          discount:doc.data()['discount'],
          category:'pizzaspastas',
          subcategory:doc.data()['subcategory']
        };
        if(!obj.discount){
          obj.discount = obj.price;
        }
        if(obj.id!='subcategory')
          requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async getBurgersFries(){
    var requestedData:{id:string,name:string,discount:number,price:number,category:string,subcategory:string}[]  =[]
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/bergersfries"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          discount:doc.data()['discount'],
          category:'bergersfries',
          subcategory:doc.data()['subcategory']
        };
        if(!obj.discount){
          obj.discount = obj.price;
        }
        if(obj.id!='subcategory')
          requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async getTeasCoffeesMocktails(){
    var requestedData:{id:string,name:string,price:number,discount:number,category:string,subcategory:string}[] = []
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/teascoffeesmocktails"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          discount:doc.data()['discount'],
          category:'teascoffeesmocktails',
          subcategory:doc.data()['subcategory']
        };
        if(!obj.discount){
          obj.discount = obj.price;
        }
        if(obj.id!='subcategory')
          requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async getSmoothiesDesserts(){
    var requestedData:{id:string,name:string,price:number,discount:number,category:string,subcategory:string}[] = []
    try{
      const querySnapshot = await getDocs(collection(this.db, "FoodCategories/categories/smoothiesdesserts"));
      querySnapshot.forEach((doc) => {
        const obj = {
          id:doc.id,
          name:doc.data()['name'],
          price:doc.data()['price'],
          discount:doc.data()['discount'],
          category:'smoothiesdesserts',
          subcategory:doc.data()['subcategory']
        };
        if(!obj.discount){
          obj.discount = obj.price;
        }
        if(obj.id!='subcategory')
          requestedData.push(obj);
      });
    }
    catch(e){
      console.log(e);
    }
    return requestedData;
  }

  async addItemtoBreadsOmellettes(Name:string,Price:number,category:string){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/breadsomelettes');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        discount:Price,
        category:'breadsomelettes',
        subcategory:category
      })
    }
    catch(e){
      console.log(e)
    }
  }
  
  async addItemtoPizzasPastas(Name:string,Price:number,category:string){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/pizzaspastas');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        discount:Price,
        subcategory:category,
        category:'pizzaspastas'
      })
    }
    catch(e){
      console.log(e)
    }
  }
  async addItemtoBergersFries(Name:string,Price:number,category:String){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/bergersfries');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        discount:Price,
        subcategory:category,
        category:'bergersfries'
      })
    }
    catch(e){
      console.log(e)
    }
  }
  async addItemtoTeasCoffeesMocktails(Name:string,Price:number,category:String){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/teascoffeesmocktails');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        discount:Price,
        subcategory:category,
        category:'teascoffeesmocktails'
      })
    }
    catch(e){
      console.log(e)
    }
  }
  async addItemtoSmoothiesDesserts(Name:string,Price:number,category:String){
    try{
      const collectionref = collection(this.db,'FoodCategories/categories/smoothiesdesserts');
      await addDoc(collectionref,{
        name:Name,
        price:Price,
        discount:Price,
        subcategory:category,
        category:'smoothiesdesserts'
      })
    }
    catch(e){
      console.log(e)
    }
  }
}
