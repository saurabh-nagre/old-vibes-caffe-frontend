import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { CartService } from 'src/app/services/cart-services/cart.service';
import { doc, getDoc } from 'firebase/firestore';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';
import { FirestoreUploadService } from 'src/app/services/sales/firestore-upload.service';

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
  billId!:number
  grandTotal:number = 0
  totalQuantity:number = 0
  timeClock!:Date
  tableNo = -1
  disable = false
  constructor(private loginService:LoginService,
        private cartService:CartService,
        private router:Router,private dbservice:FirestoreappsService,
        private uploadService:FirestoreUploadService) { 
      
      if(!this.loginService.getUser()){
          this.router.navigate(["login"],{replaceUrl:true});
      }
      else{
        let temp = this.router.getCurrentNavigation()?.extras.queryParams
        if(temp){
          this.tableNo = temp['tableno']
        }
        this.cartService.getCart(this.tableNo).forEach((value,key)=>{
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

    const date = new Date();
    this.uploadService.getBillNo(date.getDate(),date.getMonth(),date.getFullYear()).then((value)=>{
      this.billId = value;
    })

  }
  printBill() {
     
  }
  saveBill(){
    
    this.disable = true
    if(this.clientName || this.clientNumber){
      const time = this.timeClock.getTime()
      const bill  = {
        name:this.clientName,
        number: this.clientNumber,
        itemlist:this.items,
        totalPay:this.grandTotal,
        billNo:this.billId,
        itemscount:this.totalQuantity,
        timestamp: time
      }
      this.uploadService.uploadBill(bill).then((value)=>{
        if(value){
          alert("Bill Saved Successfully!");
        }
        else{
          alert("Bill can't save!");
        }
      });
    }
    else{
      alert('Check the client Name and Number is added');
    }
  }
  cancelBill(){
    let confirmation = confirm("Do you want to clear the data and create new bill?");
    if(confirmation){
      this.cartService.clearClient();
      if(this.cartService.clearCart(this.tableNo)){
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
