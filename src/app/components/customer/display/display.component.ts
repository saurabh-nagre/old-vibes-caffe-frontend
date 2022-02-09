import { Component, OnInit } from '@angular/core';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  
  categories!:any
  breadomelette:{id:string,name:string,price:number,category: string;}[] = []
  pizzapasta:{id:string,name:string,price:number,category: string;}[] = []
  burgerfries:{id:string,name:string,price:number,category: string;}[] = []
  teacoffeemocktails:{id:string,name:string,price:number,category: string;}[] = []
  smoothiesdesserts:{id:string,name:string,price:number,category: string;}[] = []

  list1hidden = false
  list2hidden = true
  list3hidden = true
  list4hidden = true
  list5hidden = true
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

  
  camparator(a:{id:string,name:string,price:number,category:string},b:{id:string,name:string,price:number,category:string}){
    return a.price>b.price?1:-1;
  }

  changeList(listname:string){
      if(this.categories[0].name!=listname)
        this.list1hidden = true
      else  this.list1hidden = false
      if(this.categories[1].name!=listname)
        this.list2hidden = true
      else  this.list2hidden = false
      if(this.categories[2].name!=listname)
        this.list3hidden = true
      else  this.list3hidden = false 
      if(this.categories[3].name!=listname)
        this.list4hidden = true
      else  this.list4hidden = false
      if(this.categories[4].name!=listname)
        this.list5hidden = true
      else  this.list5hidden = false
  }

  

}
