import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { CartService } from 'src/app/services/cart-services/cart.service';
import { doc, getDoc } from 'firebase/firestore';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';
import { FirestoreUploadService } from 'src/app/services/sales/firestore-upload.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  items:{name:string,price:number,discount:number,count:number}[] = []
  mycontact:number = 0
  clientName!:string
  clientNumber!:number
  billId!:number
  grandTotal:number = 0
  totalQuantity:number = 0
  timeClock!:Date
  tableNo = -1
  disable = false
  saving = 0
  constructor(private loginService:LoginService,
        private cartService:CartService,
        private smsService:MessageService,
        private router:Router,private dbservice:FirestoreappsService,
        private uploadService:FirestoreUploadService) { 
          if(!this.loginService.getUser()){
            this.router.navigate(["login"],{replaceUrl:true});
          }
          else{
            let temp = this.router.getCurrentNavigation()?.extras.queryParams
            if(temp)
              this.tableNo = temp['tableno']
          }
  }

  async ngOnInit(): Promise<void> {
    
    this.cartService.getCart(this.tableNo).forEach((value,key)=>{
            this.items.push(value);
            this.grandTotal+=value.discount*value.count;
            this.saving +=(value.price-value.discount)*value.count;
            this.totalQuantity+=value.count;
    })
    
    let client = this.cartService.getClient();
      if(client.name!=""){
        this.clientName = client.name;
      }
      if(client.number!=0){
        this.clientNumber = client.number;
      }     

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
  async saveBill(){
    
    this.disable = true
    if(this.clientName || this.clientNumber){
      const time = this.timeClock.getTime()
      const bill  = {
        name:this.clientName,
        number: this.clientNumber,
        itemlist:this.items,
        totalPay:this.grandTotal,
        billNo:this.billId,
        saved:this.saving,
        itemscount:this.totalQuantity,
        timestamp: time
      }
      await this.uploadService.uploadBill(bill).then(async (value)=>{
        if(value){
          alert("Bill Saved Successfully!");
          const confirmation = confirm('Should Send SMS to Client!');

          if(confirmation){
            let body = "Hello "+this.clientName+" Your total Pay is "+this.grandTotal+" for ";
             this.items.forEach((value)=>{
              body+=value.name+" "+value.count;
            });
            this.smsService.sendSms(body,this.clientNumber).subscribe((response:any)=>{
              console.log(response);
              if(response.status==200){
                alert(response.message);
              }
              else alert("SMS can't send!");
            });
            
          }
        }
        else{
          alert("Bill can't save!");
          this.disable = false;
        }
      }).catch((reason)=>{
        alert("Bill can't save!");
        this.disable = false;
      });

    }
    else{
      this.disable = false;
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
