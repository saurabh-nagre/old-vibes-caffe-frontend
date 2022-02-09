import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { CartService } from 'src/app/services/cart-services/cart.service';
import { doc, getDoc } from 'firebase/firestore';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  items:{name:string,price:number,count:number}[] = []
  mycontact:number = 0
  clientName!:string
  clientNumber!:number
  billId!:string
  grandTotal:number = 0
  totalQuantity:number = 0
  timeClock!:Date

  constructor(private loginService:LoginService,
        private cartService:CartService,
        private router:Router,private dbservice:FirestoreappsService) { 
      
      if(!this.loginService.getUser()){
          this.router.navigate(["login"],{replaceUrl:true});
      }
      else{
        this.cartService.getCart().forEach((value,key)=>{
          this.items.push(value);
          this.grandTotal+=value.price*value.count;
          this.totalQuantity+=value.count;
        })

        let client = this.cartService.getClient();
        if(client.name!=""){
          this.clientName = client.name;
        }
        if(client.number!=0){
          this.clientNumber = client.number;
        }
      }
  }

  async ngOnInit(): Promise<void> {
    await getDoc(doc(this.dbservice.getDatabase(),'ownerDetails/contact')).then((value)=>{
      this.mycontact = value.get('contact')
    })
    setInterval(()=>{
      
      this.timeClock = new Date();
        // this.timeClock = formatDate(date,"DD/MM/YYYY","local")+ date.toLocaleDateString()+" "+date.toLocaleTimeString();
    },1000);
  }
  printBill() {
      
  }
  saveBill(){

  }
  cancelBill(){
    let confirmation = confirm("Do you want to clear the data and create new bill?");
    if(confirmation){
      this.cartService.clearClient();
      if(this.cartService.clearCart()){
        this.router.navigate(["/dashboard"],{replaceUrl:true});
      }
      else
        alert("can't cancel right now, Try Again!");
    }

  }
  backClick(){
    this.cartService.saveClient(this.clientName,this.clientNumber);
    this.router.navigate(["dashboard"],{replaceUrl:true});
  }
}
