import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { CartService } from 'src/app/services/cart-services/cart.service';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  currentUser!:User
  categories!:any
  breadomelette:{id:string,name:string,price:number,category: string;}[] = []
  pizzapasta:{id:string,name:string,price:number,category: string;}[] = []
  burgerfries:{id:string,name:string,price:number,category: string;}[] = []
  teacoffeemocktails:{id:string,name:string,price:number,category: string;}[] = []
  smoothiesdesserts:{id:string,name:string,price:number,category: string;}[] = []
  constructor(private router:Router,
            private firestoreservice:FirestoreappsService,
            private loginService:LoginService,
            private cartService:CartService) {
      // const querypara = this.router.getCurrentNavigation()?.extras.queryParams
      this.currentUser = this.loginService.getUser()
      if(!this.currentUser){
        this.router.navigate(['/login']);
      }
  }

  ngOnInit(): void {  
      this.categories = this.firestoreservice.getCategories();
      
      this.firestoreservice.getBreadsOmelettes().then((value)=>{
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
  isHidden:boolean = true;
  btnName = "Edit Mode"
  changeHidden(){
    this.isHidden = !this.isHidden
    this.isHidden?this.btnName = "Edit Mode":this.btnName = "Disable Edit";
  }
  
  proceedToPrint(){
    if(this.cartService.getCart().size){
      this.router.navigate(["/print"],{replaceUrl:true});
    }
    else alert("Please select items to proceed");
  }

  //delete from list 1
  deleteList1(id:string){
    this.breadomelette.forEach((value,index)=>{
        if(value["id"]===id){
          this.breadomelette.splice(index,1);     
        }
    })
  }
  //delete from list 2
  deleteList2(id:string){
    this.pizzapasta.forEach((value,index)=>{
        if(value["id"]===id){
          this.pizzapasta.splice(index,1);     
        }
    })
  }
  //delete from list 3
  deleteList3(id:string){
    this.burgerfries.forEach((value,index)=>{
        if(value["id"]===id){
          this.burgerfries.splice(index,1);     
        }
    })
  }
  //delete from list 4
  deleteList4(id:string){
    this.teacoffeemocktails.forEach((value,index)=>{
        if(value["id"]===id){
          this.teacoffeemocktails.splice(index,1);     
        }
    })
  }
  //delete from list 5
  deleteList5(id:string){
    this.smoothiesdesserts.forEach((value,index)=>{
        if(value["id"]===id){
          this.smoothiesdesserts.splice(index,1);     
        }
    })
  }
  
  // For Adding New item to breads and Omelettes
  isAddType1Hidden = true;
  type1Name = ''
  type1Price = 0
  showAddType1(){
    this.isAddType1Hidden = false
  }
  submitAddType1(){
    this.type1Name = this.type1Name.toUpperCase();
    const shouldadd = confirm("Do you want to add '"+this.type1Name +"' with price "+"Rs."+this.type1Price+" to '"+this.categories[0]+"'?");
    if(shouldadd){
      this.firestoreservice.addItemtoBreadsOmellettes(this.type1Name,this.type1Price);
      this.isAddType1Hidden = true
    }
    else 
      this.isAddType1Hidden = true
    
    this.firestoreservice.getBreadsOmelettes().then((value)=>{
      this.breadomelette = value.sort(this.camparator);
    })
    this.type1Name = ''
    this.type1Price = 0

  }

  // for adding new item to pizzas and pastas
  isAddType2Hidden = true;
  type2Name = ''
  type2Price = 0
  showAddType2(){
    this.isAddType2Hidden = false
  }
  submitAddType2(){
    this.type2Name = this.type2Name.toUpperCase();
    const shouldadd = confirm("Do you want to add '"+this.type2Name +"' with price "+"Rs."+this.type2Price+" to '"+this.categories[1]+"'?");
    if(shouldadd){
      this.firestoreservice.addItemtoPizzasPastas(this.type2Name,this.type2Price);
      this.isAddType2Hidden = true
    }
    else 
      this.isAddType2Hidden = true
    
    this.firestoreservice.getPizzasPastas().then((value)=>{
      this.pizzapasta = value.sort(this.camparator);
    })
    
    this.type2Name = ''
    this.type2Price = 0
  }

  // for adding new item to Burgers & Fries
  isAddType3Hidden = true;
  type3Name = ''
  type3Price = 0
  showAddType3(){
    this.isAddType3Hidden = false
  }
  submitAddType3(){
    this.type3Name = this.type3Name.toUpperCase();
    const shouldadd = confirm("Do you want to add '"+this.type3Name +"' with price "+"Rs."+this.type3Price+" to '"+this.categories[2]+"'?");
    if(shouldadd){
      this.firestoreservice.addItemtoBergersFries(this.type3Name,this.type3Price);
      this.isAddType3Hidden = true
    }
    else 
      this.isAddType3Hidden = true
    
    this.firestoreservice.getBurgersFries().then((value)=>{
      this.burgerfries = value.sort(this.camparator);
    })
    this.type3Name = ''
    this.type3Price = 0
  }
  //for adding new item to 'Tea Coffee Mocktails'
  isAddType4Hidden = true;
  type4Name = ''
  type4Price = 0
  showAddType4(){
    this.isAddType4Hidden = false
  }
  submitAddType4(){
    this.type4Name = this.type4Name.toUpperCase();
    const shouldadd = confirm("Do you want to add '"+this.type4Name +"' with price "+"Rs."+this.type4Price+" to '"+this.categories[3]+"'?");
    if(shouldadd){
      this.firestoreservice.addItemtoTeasCoffeesMocktails(this.type4Name,this.type4Price);
      this.isAddType4Hidden = true
    }
    else 
      this.isAddType4Hidden = true
    
    this.firestoreservice.getTeasCoffeesMocktails().then((value)=>{
      this.teacoffeemocktails = value.sort(this.camparator);
    })
    this.type4Name = ''
    this.type4Price = 0
  }
  
  //for adding new item to 'Smoothies Desserts'
  isAddType5Hidden = true;
  type5Name = ''
  type5Price = 0
  showAddType5(){
    this.isAddType5Hidden = false
  }
  submitAddType5(){
    this.type5Name = this.type5Name.toUpperCase();
    const shouldadd = confirm("Do you want to add '"+this.type5Name +"' with price "+"Rs."+this.type5Price+" to '"+this.categories[4]+"'?");
    if(shouldadd){
      this.firestoreservice.addItemtoSmoothiesDesserts(this.type5Name,this.type5Price);
      this.isAddType5Hidden = true
    }
    else 
      this.isAddType5Hidden = true
    
    this.firestoreservice.getSmoothiesDesserts().then((value)=>{
      this.smoothiesdesserts = value.sort(this.camparator);
    })
    this.type5Name = ''
    this.type5Price = 0
  }


}
