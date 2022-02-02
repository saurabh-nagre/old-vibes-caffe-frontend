import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { CartService } from 'src/app/services/cart-services/cart.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  items:{name:string,price:number,count:number}[] = []

  clientName!:string
  clientNumber!:number
  billId!:string

  constructor(private loginService:LoginService,
        private cartService:CartService,
        private router:Router) { 
      
      if(!this.loginService.getUser()){
          this.router.navigate(["login"]);
      }
      else{
        this.cartService.getCart().forEach((value,key)=>{
          this.items.push(value);
        })
      }
      
  }

  ngOnInit(): void {
  }

}
