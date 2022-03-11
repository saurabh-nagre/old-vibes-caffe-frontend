import { Component, OnInit } from '@angular/core';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  categories!:any
  breadomelette:{id:string,name:string,price:number,discount:number,category: string,subcategory:string}[] = []
  pizzapasta:{id:string,name:string,price:number,discount:number,category: string,subcategory:string}[] = []
  burgerfries:{id:string,name:string,price:number,discount:number,category: string,subcategory:string}[] = []
  teacoffeemocktails:{id:string,name:string,price:number,discount:number,category: string,subcategory:string}[] = []
  smoothiesdesserts:{id:string,name:string,price:number,discount:number,category: string,subcategory:string}[] = []
  
  listHidden = [false,true,true,true,true]
  constructor(private firestoreservice:FirestoreappsService) { }

  async ngOnInit(): Promise<void> {
      this.categories = this.firestoreservice.getCategories();
      
      await this.firestoreservice.getBreadsOmelettes().then((value)=>{
          this.breadomelette = value.sort(this.camparator); 
      })
      
      this.firestoreservice.getBurgersFries().then((value)=>{
        this.burgerfries = value.sort(this.camparator);    
      });

      
      this.firestoreservice.getPizzasPastas().then((value)=>{
        this.pizzapasta = value.sort(this.camparator);    
      });
      this.firestoreservice.getTeasCoffeesMocktails().then((value)=>{
        this.teacoffeemocktails = value.sort(this.camparator);    
      });
      this.firestoreservice.getSmoothiesDesserts().then((value)=>{
        this.smoothiesdesserts = value.sort( this.camparator);    
      });
  }

  
  camparator(a:{id:string,name:string,price:number,category:string,subcategory:string},b:{id:string,name:string,price:number,category:string,subcategory:string}){
    return a.price>b.price?1:-1;
  }

  changeList(listname:string){
      for(let i = 0;i<5;i++){
        if(this.categories[i].name!=listname)
          this.listHidden[i] = true
        else  this.listHidden[i] = false
      }
  }

  

}
